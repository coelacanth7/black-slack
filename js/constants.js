const path = require("path");
const fs = require("fs");
const constants = {};

// File paths
constants.slackFile =
	"/Applications/Slack.app/Contents/Resources/app.asar.unpacked/src/static/ssb-interop.js";
constants.cssFilePath =
	"/Applications/Slack.app/Contents/Resources/app.asar.unpacked/src/static/black.css";
constants.injectedJSFilePath = path.resolve(__dirname, "./jstoinject.js");
constants.injectedCssFilePath = path.resolve(__dirname, "../css/black.css");

// injected Data
constants.injectedJSFile = fs.readFileSync(
	constants.injectedJSFilePath,
	"utf8"
);
constants.injectedCssFile = fs.readFileSync(
	constants.injectedCssFilePath,
	"utf8"
);

// document elements
constants.cssSelect = document.getElementById("css-file-select");
constants.injectButton = document.getElementById("inject");

module.exports = constants;
