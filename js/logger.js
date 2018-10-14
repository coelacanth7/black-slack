logger = {};

logger.log = log => {
  console.log("log", log);
	var ul = document.getElementById("logs");
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(log));
	ul.appendChild(li);
};

module.exports = logger;
