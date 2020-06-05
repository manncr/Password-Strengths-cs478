import React from "react";

const formatFeedback = feedback => {
      return (
        <>
        <p>{feedback.simple}</p>
          {feedback.suggestions.length > 0 && (
            <>
            <h4>Suggestions:</h4>
              <ul>
                {feedback.suggestions.map(suggestion => (
                  <li key={suggestion}>{suggestion}</li>
                ))}
              </ul>
            </>
          )}
        </>
      );
  };

const determineStrength = (password) =>{
    const length = password.length;
    var score = 0;
    var i = 0;
    var uppercase = false;
    var lowercase = false;
    var special = false;
    var number = false;
    //Bonus bits-------------------

    /*
    //Length bonuses
    if(length >= 1){    //First character. +4
        score += 4.0;
        if(length >= 2){  //2nd-8th characters. +2
            if(length > 8){
                score += 7 * 2;
                if(length > 20){    //9th-20th characters. +1.5
                    score += 1.5 * 12
                }
                else{
                    score += (length - 8) * 1.5;
                }
            }
            else{
                score += (length-1) * 2.0;
            }
        }
    }
*/
    //Contains uppercase or non-alphabetic characters. +3 for each
    //Other conditionals are for getting the charset size

    while(i < length){
        var char = password[i];
        if(isNaN(char * 1)){   //turns from char to int, checks if not a number
            if(char.match(/[A-Z]/g)){    //check if uppercase
                uppercase = true;
            }
            else if(char.match(/[a-z]/g)){   //check if lowercase
                lowercase = true;
            }
            else{ //Else it's not alphanumeric
                special = true;
            }
        }
        else{
            number = true;
        }
        i++;
    }

    //Dictionary check. +3 if substring matches, +6 if no match
    //TODO: ^^

    //Entropy--------
    var charsetSize = 0;
    var entropy = 0;

    //get charset size
    if(uppercase){charsetSize += 26;}
    if(lowercase){charsetSize += 26;}
    if(special){charsetSize += 33;}
    if(number){charsetSize += 10;}

    //entropy formula according to NIST Eletronic Authentication Guidelines
    if(charsetSize > 0){
        entropy = Math.log2(charsetSize) * length;
    } else{ entropy = 0;}
    console.log("middle score:", score);
    console.log("Entropy: " + entropy + 
    "  Bonus bits: " + score, 
     "Length: " + length);
    score += entropy;

    var feedback = {
        score: score,
        uppercase: uppercase,
        lowercase: lowercase,
        special: special,
        number: number,
    };

    var result = generateFeedback(feedback);
    return { strength: result.strength, description: result.description};
    
};



const generateFeedback = (result) => {
    var score = 0;
    var description = [];
    var feedback = {};

    console.log("==Feedback score at top: ", score, "Results score:", result.score);
    
    //Charset suggestions
    if(!result.uppercase){ description.push("Use uppercase letters");}
    if(!result.lowercase){description.push("Use lowercase letters");}
    if(!result.special){description.push("Use special symbols");}
    if(!result.number){description.push("Use numbers");}

    //<14 = 1
    //<28 = very weak = 2-3
    //28-35 weak = 4-5
    //36-59 reasonable  = 6-7
    //60-127 strong = 8-9
    //128+ very strong = 10

    //Simple overview by score
    if(result.score <= 14.0){
        score = 1;
        feedback.simple ="Very weak";
    }
    else if(result.score >= 14.1 && result.score <= 28.0){
        if(result.score < 22){
            score = 2;
            feedback.simple ="Very weak";
        }
        else{
            score = 3;
            feedback.simple ="Very weak";
        }
    }
    else if(result.score >= 28.1 && result.score <= 35.0){
        if(result.score <= 32){
            score = 4;
            feedback.simple ="Weak";
        }
        else{
            score = 5;
            feedback.simple ="Weak";
        }
    }
    else if(result.score >= 35.1 && result.score <= 59.0){
        if(result.score < 53){
            score = 6;
            feedback.simple ="Reasonable";
        }
        else{
            score = 7
            feedback.simple ="Reasonable";
        }
    }
    else if(result.score >= 59.1 && result.score <= 127.0){
        if(result.score < 94){
            score = 8;
            feedback.simple ="Strong";
        }
        else{
            score = 9;
            feedback.simple ="Strong";
        }
    }
    else {
        score = 10;
        feedback.simple ="Very Strong";
    }

    //Turn into object to get feedback in html
    feedback.suggestions = description;
    return {strength: score, description: formatFeedback(feedback)};
}

const name = "NIST Electronic Authentication Guidelines: Entropy"
const checker = {name, determineStrength};

export default checker;
