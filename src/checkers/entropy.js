import React from "react";

const formatFeedback = feedback => {
    if (true) {
      return <p></p>;
    }
    return (
      <>
        <p>{feedback.warning}</p>
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

    //Contains uppercase or non-alphabetic characters. +3 for each
    //Other conditionals are for getting the charset size

    while(i < length){
        var char = password[i];
        if(isNaN(char * 1)){   //turns from char to int, checks if not a number
            console.log("--Regex check: ", char.match(/[A-Z]/i), " char= ", char);
            if(char.match(/[A-Z]/i)){    //regex to check if uppercase alpha
                uppercase = true;
            }
            else if(char.match(/[a-z]/i)){   //check if lowercase alpha
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
    entropy = Math.log2(charsetSize) * length;

    console.log("Entropy: " + entropy + "  Bonus bits: " + score);
    score += entropy;

    var feedback = {
        score: score,
        uppercase: uppercase,
        lowercase: lowercase,
        special: special,
        number: number,
        entropy: entropy
    };

    return { strength: (score % 10 + 1), description: formatFeedback(generateFeedback(feedback)) }
    
};

const generateFeedback = (result) => {
    var feedback = {};
    var score = 0;
    var description = "";
    console.log("==Feedback score at top: ", score);

    //Descriptive result
    if(!result.uppercase)
    if(!result.lowercase)
    if(!result.special)
    if(!result.number)

        //<14 = 1
        //<28 = very weak = 2-3
        //28-35 weak = 4-5
        //36-59 reasonable  = 6-7
        //60-127 strong = 8-9
        //128+ very strong = 10

    //Strength and result based on entropy
    if(result.score <= 14){
        score = 1;
        description = "Use more than 4 characters.";
    }
    else if(result.score >= 15 && result.score <= 28){
        if(result.score < 22){
            score = 2;
            description = "";
        }
        else{
            score = 3;
            description = "";
        }
    }
    else if(result.score >= 29 && result.score <= 35){
        if(result.score >= 32){
            score = 4;
            description = "";
        }
        else{
            score = 5;
            description = "";
        }
    }
    else if(result.score >= 36 && result.score <= 59){
        if(result.score < 53){
            score = 6;
            description = "";
        }
        else{
            score = 7
            description = "";
        }
    }
    else if(result.score >= 60 && result.score <= 127){
        if(result.score < 94){
            score = 8;
            description = "";
        }
        else{
            score = 9;
            description = "";
        }
    }
    else {
        score = 10;
        description = "";
    }


    
}

const name = "NIST Electronic Authentication Guidelines: Entropy"
const checker = {name, determineStrength};

export default checker;
