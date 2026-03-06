/**
 * Utility functions for Neuranet AI.
 * 
 * (C) 2023 Tekmonks. All rights reserved.
 */

const path = require("path");
const mustache = require("mustache");
const fspromises = require("fs").promises;
const serverutils = require(`${CONSTANTS.LIBDIR}/utils.js`);

const DEBUG_RUN = NEURANET_CONSTANTS.CONF.debug_mode;
const PROMPT_CACHE = {};
const modified_times = {};

exports.getPrompt = async function(promptFile) {
    const pathToFile = path.resolve(promptFile);

    if (DEBUG_RUN) {
        const lastModTimeForPrompt = (await fspromises.stat(pathToFile)).mtimeMs;
        if (lastModTimeForPrompt == modified_times[pathToFile]) return PROMPT_CACHE[pathToFile];
        PROMPT_CACHE[pathToFile] = await fspromises.readFile(promptFile, "utf-8");
        modified_times[pathToFile] = lastModTimeForPrompt;
    }

    if (!PROMPT_CACHE[pathToFile]) PROMPT_CACHE[pathToFile] = await fspromises.readFile(pathToFile, "utf-8");
    return PROMPT_CACHE[pathToFile];
}

exports.getAIModel = async function(model_name, overrides) {
    const _overrideModel = async model => { 
        if (model.inherits) {
            const basemodel = await exports.getAIModel(model.inherits);
            for (const [key, value] of Object.entries(model)) serverutils.setObjProperty(basemodel, key, value);  // When using inheritance, copy the base model and rename it. Use recursive overriding here if you need to override recursive properties along with the name. If not, a normal override is sufficient.
            model = basemodel;
        }
        if (overrides) for (const [key, value] of Object.entries(overrides)) serverutils.setObjPropertyRecursive(model, key, value);  // It allows us to recursively override the key values. This stops the entire object from being replaced. Only the needed key values are changed.
        return model;
    }
    if ((!DEBUG_RUN) && NEURANET_CONSTANTS.CONF.ai_models[model_name]) return await _overrideModel(serverutils.clone(NEURANET_CONSTANTS.CONF.ai_models[model_name]));

    const confFile = await fspromises.readFile(`${NEURANET_CONSTANTS.CONFDIR}/neuranet.json`, "utf8");
    const renderedFile = mustache.render(confFile, NEURANET_CONSTANTS);
    const jsonConf = JSON.parse(renderedFile);
    NEURANET_CONSTANTS.CONF.ai_models[model_name] = jsonConf.ai_models[model_name];   // update cached models

    const model = serverutils.clone(NEURANET_CONSTANTS.CONF.ai_models[model_name]);
    return await _overrideModel(model);
}
