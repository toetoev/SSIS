const toTitleCase = (string) => {
	var sentence = string.toLowerCase().split(" ");
	for (var i = 0; i < sentence.length; i++) {
		sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
	}
	return sentence;
};

export default toTitleCase;
