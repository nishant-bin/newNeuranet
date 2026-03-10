/**
 * LLM based chat module. Can use any LLM.
 * 
 * Request params
 * 	id - the user ID
 *  org - the user org
 *  raw_question - the raw question from the user
 *  session - Array of [{"role":"user||assistant", "content":"[chat content]"}]
 *  maintain_session - If set to false, then session is not maintained
 *  session_id - The session ID for a previous session if this is a continuation else null
 *  aiappid - The calling ai app
 * 
 * Response object
 *  result - true or false
 *  reason - set to one of the reasons if result is false
 *  response - the AI response, as a plain text
 *  session_id - the session ID which can be used to ask backend to maintain sessions
 * 
 * (C) 2023 TekMonks. All rights reserved.
 */
const utils = require(`${CONSTANTS.LIBDIR}/utils.js`);
const crypt = require(`${CONSTANTS.LIBDIR}/crypt.js`);
const quota = require(`${NEURANET_CONSTANTS.LIBDIR}/quota.js`);
const aiapp = require(`${NEURANET_CONSTANTS.LIBDIR}/aiapp.js`);
const dblayer = require(`${NEURANET_CONSTANTS.LIBDIR}/dblayer.js`);
const chatsession = require(`${NEURANET_CONSTANTS.LIBDIR}/chatsession.js`);
const llmflowrunner = require(`${NEURANET_CONSTANTS.LIBDIR}/llmflowrunner.js`);

const REASONS = llmflowrunner.REASONS, MODEL_DEFAULT = "chat-openai", PROMPT_FILE_NO_SUMMARY = "chat_prompt_no_summmary.txt", 
	DEBUG_MODE = NEURANET_CONSTANTS.CONF.debug_mode, DEFAULT_SYSTEM_MESSAGE = "You are a helpful assistant";

exports.chat = async params => {
	if (!validateRequest(params)) {LOG.error("Validation failure."); return {reason: REASONS.VALIDATION, ...CONSTANTS.FALSE_RESULT};}

	LOG.debug(`Got chat request from ID ${params.id}. Incoming request is ${JSON.stringify(params)}`);

	if (!exports.check_quota(params.id, params.org, params.aiappid)) {
		LOG.error(`Disallowing the LLM chat call, as the user ${params.id} is over their quota.`);
		return {reason: REASONS.LIMIT, ...CONSTANTS.FALSE_RESULT};
	}

	const {aiModelObject, aiKey, aiLibrary} = await exports.getAIModelAndObjectKeyAndLibrary(params.model, params.id, params.org, params.aiappid);
	if (!aiModelObject) {LOG.error("Bad AI Library or model - "+aiModuleToUse); return {reason: REASONS.BAD_MODEL, ...CONSTANTS.FALSE_RESULT}}

	const {sessionID} = chatsession.getUsersChatSession(params.id, params.session_id);
	const finalSessionObject = await chatsession.getFinalSessionObject(params.id, params.session_id, aiModelObject, aiLibrary, params.session);
	
	const promptFile = `${NEURANET_CONSTANTS.TRAININGPROMPTSDIR}/${PROMPT_FILE_NO_SUMMARY}`;
	const response = await aiLibrary.process({session: finalSessionObject, 
		system_message: aiModelObject.system_message?.trim()||DEFAULT_SYSTEM_MESSAGE}, promptFile, aiKey, aiModelObject);

	if (!response) {
		LOG.error(`AI library error processing request ${JSON.stringify(params)}`); 
		return {reason: REASONS.INTERNAL, ...CONSTANTS.FALSE_RESULT};
	} else {
		const aiappThis = await aiapp.getAIApp(params.id, params.org, params.aiappid, true);
        if (!aiappThis.disable_model_usage_logging) dblayer.logUsage(params.id, response.metric_cost||0, aiModelObject.name);
		else LOG.info(`ID ${params.id} of org ${params.org} used ${response.metric_cost||0} of AI quota. Not logged, as usage logging is disabled by app ${params.aiappid}`);
		const incoming_prompt = params.raw_question||params.session.at(-1).content;
		if (params.maintain_session != false) chatsession.addToSession(incoming_prompt, response.airesponse, 
			params.id, sessionID, aiModelObject.user_role, aiModelObject.assistant_role);
		return {response: response.airesponse, reason: REASONS.OK, ...CONSTANTS.TRUE_RESULT, session_id: sessionID};
	}
}

exports.getAIModelAndObjectKeyAndLibrary = async (modelobject, id, org, aiappid) => {
    let aiModelToUse, aiModelObject;
    if (modelobject && modelobject.name) aiModelToUse = modelobject.name;
    else aiModelToUse = MODEL_DEFAULT;
    
    if (modelobject && modelobject.driver && modelobject.driver.module) aiModelObject = modelobject;	// Already a complete AI model object    
    else {	// Need to fetch the model configuration
        const modelOverrides = modelobject ? modelobject.model_overrides : undefined;
        aiModelObject = await aiapp.getAIModel(aiModelToUse, modelOverrides, id, org, aiappid);
    }
    const aiKey = crypt.decrypt(aiModelObject.ai_key, NEURANET_CONSTANTS.CONF.crypt_key);
    const aiModuleToUse = `${NEURANET_CONSTANTS.LIBDIR}/${aiModelObject.driver.module}`;
	let aiLibrary; try{aiLibrary = utils.requireWithDebug(aiModuleToUse, DEBUG_MODE);} catch (err) {
		LOG.error("Bad AI Library or model - "+aiModuleToUse); 
		return false;
	}
	return {aiModelToUse, aiModelObject, aiKey, aiLibrary};
}

exports.check_quota = async (id, org, aiappid) => {
	const aiappThis = await aiapp.getAIApp(id, org, aiappid, true);
    if ((!aiappThis.disable_quota_checks) && (!(await quota.checkQuota(id, org, aiappid)))) {
		LOG.error(`Quota check failed as the user ${params.id} is over their quota.`);
		return false;
	} else return true;
}

const validateRequest = params => (params && params.id && params.org && params.session && 
	Array.isArray(params.session) && params.session.length >= 1);