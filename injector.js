// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const fs = require("fs");

// File paths
const slackFile =
	"/Applications/Slack.app/Contents/Resources/app.asar.unpacked/src/static/ssb-interop.js";
const cssFilePath =
	"/Applications/Slack.app/Contents/Resources/app.asar.unpacked/src/static/black.css";
const injectedJSFilePath = "./injectedJS.js";
const injectedCssFilePath = "./css/black.css";

// injected Data
const injectedJSFile = fs.readFileSync(injectedJSFilePath, "utf8");
const injectedCssFile = fs.readFileSync(injectedCssFilePath, "utf8");

// document elements
const cssSelecet = document.getElementById("css-file-select");
const injectButton = document.getElementById("inject");

// listeners
cssSelecet.addEventListener("change", e => console.log(e.target.value));
injectButton.addEventListener("click", handleFlow);

// handle the flow
function handleFlow() {
	console.log("inject");

	if (!checkIfJsHasInjected()) {
		thenInjectJS();
	}

	if (!checkIfCssHasInjected()) {
		thenInjectCSS();
	}

	if (checkIfJsHasInjected() && checkIfCssHasInjected()) {
		console.log("you got both now");
		console.log("you should be good to go :)");
	}
}

function checkIfJsHasInjected() {
	let ssbInteropBuffer;
	let injectedJSFileBuffer;
	let includesTheJS;

	// try
	try {
		// read the file buffer
		ssbInteropBuffer = fs.readFileSync(slackFile);
		injectedJSFileBuffer = fs.readFileSync(injectedJSFilePath);
	} catch (e) {
		// log errors
		console.error(e);
	} finally {
		// check if slack application file has injectedJS
    includesTheJS  = ssbInteropBuffer.indexOf(injectedJSFileBuffer) > -1
		console.log("your js file exists = ", includesTheJS);

		// return bool
		return includesTheJS;
	}
}

function checkIfCssHasInjected() {
	let cssExists;

	// try
	try {
		// does the css exist yet?
		cssExists = fs.existsSync(cssFilePath);
	} catch (e) {
		console.error(e);
	} finally {
		console.log("your css file exists = ", cssExists);
		return cssExists;
	}
}

function thenInjectCSS() {
	// try
	try {
		// append injectedJS to file
		fs.writeFileSync(cssFilePath, injectedCssFile);
		console.log(`Appending CSS hack to path ${cssFilePath}`);
	} catch (e) {
		// log errors
		console.error(e);
	}
}

function thenInjectJS() {
	// try
	try {
		// append injectedJS to file
		fs.appendFileSync(slackFile, injectedJSFile);
		console.log(`Appending JS hack to path ${slackFile}`);
	} catch (e) {
		// log errors
		console.error(e);
	}
}
