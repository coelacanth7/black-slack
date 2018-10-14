const fs = require("fs");

const logger = require("./logger");
const constants = require("./constants");

// listeners
constants.cssSelecet.addEventListener("change", e =>
	logger.log(e.target.value)
);
constants.injectButton.addEventListener("click", handleFlow);

// handle the flow
function handleFlow() {
	logger.log("inject");

	if (!checkIfJsHasInjected()) {
		thenInjectJS();
	}

	if (!checkIfCssHasInjected()) {
		thenInjectCSS();
	}

	if (checkIfJsHasInjected() && checkIfCssHasInjected()) {
		logger.log("you got both now");
		logger.log("you should be good to go :)");
	}
}

function checkIfJsHasInjected() {
	let ssbInteropBuffer;
	let injectedJSFileBuffer;
	let includesTheJS;

	// try
	try {
		// read the file buffer
		ssbInteropBuffer = fs.readFileSync(constants.slackFile);
		injectedJSFileBuffer = fs.readFileSync(constants.injectedJSFilePath);
	} catch (e) {
		// log errors
		logger.error(e);
	} finally {
		// check if slack application file has injectedJS
		includesTheJS = ssbInteropBuffer.indexOf(injectedJSFileBuffer) > -1;
		logger.log(`your js file exists = ${includesTheJS}`);

		// return bool
		return includesTheJS;
	}
}

function checkIfCssHasInjected() {
	let cssExists;

	// try
	try {
		// does the css exist yet?
		cssExists = fs.existsSync(constants.cssFilePath);
	} catch (e) {
		logger.error(e);
	} finally {
		logger.log(`your css file exists = ${cssExists}`);
		return cssExists;
	}
}

function thenInjectCSS() {
	// try
	try {
		// append injectedJS to file
		fs.writeFileSync(constants.cssFilePath, constants.injectedCssFile);
		logger.log(`Appending CSS hack to path ${cssFilePath}`);
	} catch (e) {
		// log errors
		logger.error(e);
	}
}

function thenInjectJS() {
	// try
	try {
		// append injectedJS to file
		fs.appendFileSync(constants.slackFile, constants.injectedJSFile);
		logger.log(`Appending JS hack to path ${slackFile}`);
	} catch (e) {
		// log errors
		logger.error(e);
	}
}
