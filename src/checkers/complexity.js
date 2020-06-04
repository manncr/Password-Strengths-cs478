import React from "react";
import text from "../text.json"

const formatFeedback = feedback => {
//	if (!feedback.warning && !feedback.suggestions) {
//		return <p></p>
//	}
	return (
		<>
			<>
				<h4>Suggestions:</h4>
				<ul>
					<p>{feedback}</p>
				</ul>
			</>
		</>
	);
};

const determineStrength = password => {
	// w is password
	// n is number of charsets in w
	// k is the number of same-charset-substrings
	// l is the length of password
	// s is a bonus if w has special characters
	// p is special character position penalty
	// d/l is the in-dictionary penalty.
	// s = 0.5 if w contains a special character, 0 otherwise
	// p = 0.5 if special character is at the beginning or the end of w and w has no more 
	// 			than 2 charsets. 0 otherwise
	// d is the length of the substring that is a dictionary word
	var special = "*|,\":<>[]{}`';()@&$#%";
	var l = password.length;
	if (l < 4) {
		var feedback = "Password needs to be longer than 4 characters";
		return {strength: 0, description: formatFeedback(feedback)}
	}
	var n = 1.0; // this is because we have the default charset = utf-8 we are gonna assume thats 1
	var k = 1.0; // all of the substrings are in the same charset
	var s = 0.0;
	var p = 0.0
	for (var i = 0; i < l; i++){
		if (special.indexOf(password.charAt(i)) !== -1) {
			s = 0.5
			if (i === 0 || i === (l - 1)) {
				p = 0.5; 
			}
		}
	}

	var textl = (text.length/30);
	var d = 0.0;
	for(var j = 0; j < textl; j++){
		console.log('checking');
		if (password === text[j]) {
			d = text[j].length;
			console.log("found");
		}
	}

	var c = n + (k/l) + s - p - (d/l);


	//check if its in a dictionary. get the list of possible substrings.
	//	[a-zA-Z]*
	//	then do a binary search on the file. 


	const score = c;
	var feedback = "Score: " + c.toString();
	return {strength: score, description: formatFeedback(feedback)}
};

const name = "Complexity checker";

const checker = { name, determineStrength};

export default checker;
