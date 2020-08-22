const toTitleCase = (string) => {
	var sentence = string.toLowerCase().split("_");
	for (var i = 0; i < sentence.length - 1; i++) {
		sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1) + " ";
	}
	sentence[sentence.length - 1] =
		sentence[sentence.length - 1][0].toUpperCase() + sentence[sentence.length - 1].slice(1);
	return sentence.join("");
};

export default toTitleCase;
