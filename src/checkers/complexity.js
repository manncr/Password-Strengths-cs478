import React from "react";
import text from "../words_alpha.json"

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
	var num = "1234567890";
	var word = "abcdefghijklmnopqrstuvwzyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var l = password.length;
	if (l < 4) {
		var feedback = "Password needs to be longer than 4 characters";
		return {strength: 0, description: formatFeedback(feedback)}
	}
	var n = 0.0; // this is because we have the default charset = utf-8 we are gonna assume thats 1
	var k = 0.0; // all of the substrings are in the same charset
	var wordsub = [];
	var numsub = [];
	var specialsub = [];
	var numstr = "";
	var specialstr = "";
	var wordstr = "";
	var s = 0.0;
	var p = 0.0;
	var specialc,numc,wordc = 0;
	for (var e = 0; e < l; e++){
		if (num.includes(password.charAt(e))){
			numstr += password.charAt(e);
			if ((num.includes(password.charAt(e + 1)) === false) || (e+1 == l)){
				numsub.push(numstr);
				numstr = "";
			}
			if (numc === 0){
				n+=1.0;
				numc = 1;
			}
		}
		if (word.includes(password.charAt(e))){
			wordstr += password.charAt(e)
			if ((word.includes(password.charAt(e + 1)) === false) || (e+1 == l)){
				wordsub.push(wordstr);
				wordstr = "";
			}
			if (wordc === 0){
				n+=1.0;
				wordc = 1;
			}
		}
		if (special.includes(password.charAt(e))){
			specialstr += password.charAt(e);
			if ((special.includes(password.charAt(e + 1)) === false) || (e+1 == l)){
				specialsub.push(specialstr);
				specialstr = "";
			}
			if ((e === 0 || e === (l - 1)) && p === 0.0) {
					p = 0.5; 
			}
			if (specialc === 0){
				s = 0.5;
				n+= 1.0;
			}
		}
	}
	var check = specialc + numc + wordc;
	if (check >= 2){
		p = 0;
	}
	k = numsub.length + wordsub.length + specialsub.length; 
	console.log(numsub)
	console.log(wordsub)
	console.log(specialsub)
	console.log(k);
	console.log(n);

	var textl = (text.length);
	console.log(textl);
	var d = 0.0;
	var left = 0;
	var right = textl - 1;
	var index;
	for(var q = 0; q < wordsub.length; q++){
		console.log(wordsub[q])
		left = 0;
		right = textl - 1;
		index = 0;
		while (left <= right){
			index = Math.floor((left + right)/2);
			console.log("Left " + left);
			console.log("right" + right);
			console.log("Comparing: " + wordsub[q] + " with " + text[index]);
			console.log(wordsub[q].length)
			if (wordsub[q] == text[index].trim()){
				d = wordsub[q].length;
				console.log("found");
			}
			if (wordsub[q] < text[index].trim()){
				right = index - 1;
			}
			else {
				left = index + 1;
			}
		
		}
	}

	console.log("d value is " + d)
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
