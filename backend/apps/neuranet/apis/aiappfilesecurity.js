/**
 * Neuranet AI app file security middleware. Enforces isAdmin/isAIAppAdmin
 * RBAC checks before delegating to the respective xbin file API.
 * (C) 2024 TekMonks. All rights reserved.
 */
const login = require(`${NEURANET_CONSTANTS.APIDIR}/login.js`);
const aiapp = require(`${NEURANET_CONSTANTS.LIBDIR}/aiapp.js`);

exports.doService = async (jsonReq, servObject, headers, url, apiconf) => {
	const isAdmin = login.isAdmin(headers);
	if (!isAdmin && (jsonReq.extraInfo?.aiappid || jsonReq?.aiappid)) {
		const id = login.getID(headers), org = login.getOrg(headers), aiappid = jsonReq.extraInfo.aiappid;
		const isAppAdmin = await aiapp.isAIAppAdmin(id, org, aiappid);
		if (!isAppAdmin) {LOG.error(`User ${id} is not authorized for app ${aiappid}.`); return {...CONSTANTS.FALSE_RESULT, unauthorized: true};}
	}
	const xbinAPI = require(`${NEURANET_CONSTANTS.APPROOT}/xbinapp/apis/${apiconf.apiname}.js`);
	return xbinAPI.doService(jsonReq, servObject, headers, url, apiconf);
}
