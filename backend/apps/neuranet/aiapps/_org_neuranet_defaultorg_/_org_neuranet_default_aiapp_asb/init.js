/**
 * If this file is present the Neuranet backend will call it whenever
 * the server starts or restarts.
 */

const aiappMod = require(`${NEURANET_CONSTANTS.LIBDIR}/aiapp.js`);
const pluginhandler = require(`${NEURANET_CONSTANTS.LIBDIR}/pluginhandler.js`);

const NO_ID = "noname@nothing.com", ASBAGENT_PLUGIN_NAME = "asbagent";

exports.initAsync = async (org, aiappid) => {
    const aiapp = await aiappMod.getAIApp(NO_ID, org, aiappid);    // ID is not used for resolving org's published apps
    const asbagent = await pluginhandler.getPlugin(ASBAGENT_PLUGIN_NAME);
    await asbagent.initAsync(aiapp);
}