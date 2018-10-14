// https://gist.github.com/a7madgamal/c2ce04dde8520f426005e5ed28da8608

// This is the JS file to inject into the Slack Applications folder

// The css file to apply
const cssFile = "black";
const url = `/Applications/Slack.app/Contents/Resources/app.asar.unpacked/src/static/${cssFile}.css`;

document.addEventListener("DOMContentLoaded", function() {
	const fs = require("fs");
	fs.readFile(url, "utf8", (err, css) => {
		if (err) throw err;
		$("<style></style>")
			.appendTo("head")
			.html(css);
	});
});
