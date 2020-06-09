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
          <h4>Entropy Score: {feedback.entropy}</h4>
        </>
      );
  };

const determineStrength = (password) =>{
    const length = password.length;
    var bonus = 0;
    var i = 0;
    var uppercase = false;
    var lowercase = false;
    var special = false;
    var number = false;
    var charsetSize = 0;
    var entropy = 0;
 
    //Contains uppercase or non-alphabetic characters. bonus +3 for both
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

    //get charset size
    if(uppercase){charsetSize += 26;}
    if(lowercase){charsetSize += 26;}
    if(special){charsetSize += 33;}
    if(number){charsetSize += 10;}

    //entropy formula according to NIST Eletronic Authentication Guidelines
    if(charsetSize > 0){
        entropy = Math.log2(charsetSize) * length;
    } else{ 
        entropy = 0;
    }

    console.log("Entropy: " + entropy + "Bonus bits: " + bonus);

    var feedback = {
        score: entropy,
        uppercase: uppercase,
        lowercase: lowercase,
        special: special,
        number: number,
    };

    return generateFeedback(feedback);
};



const generateFeedback = (result) => {
    var score = 1;
    var description = [];
    var feedback = {
        entropy: result.score
    };
    
    //Charset suggestions
    if(!result.uppercase){ description.push("Use uppercase letters");}
    if(!result.lowercase){description.push("Use lowercase letters");}
    if(!result.special){description.push("Use special symbols");}
    if(!result.number){description.push("Use numbers");}

    //Scoring from this website: https://www.pleacher.com/mp/mlessons/algebra/entropy.html
    //<28 = very weak = 2-3
    //28-35 weak = 4-5
    //36-59 reasonable  = 6-7
    //60-127 strong = 8-9
    //128+ very strong = 10

    //Simple overview by score
    if(result.score <= 28){
            score = 2;
            feedback.simple ="Very weak; might keep out family members";
    }
    else if(result.score >= 28.1 && result.score <= 35){
        if(result.score <= 31.5){
            score = 3;
            feedback.simple ="Weak; should keep out most people, often good for desktop login passwords";
        }
        else{
            score = 4;
            feedback.simple ="Weak; should keep out most people, often good for desktop login passwords";
        }
    }
    else if(result.score >= 35.1 && result.score <= 59){
        if(result.score < 47){
            score = 5;
            feedback.simple ="Reasonable; fairly secure passwords for network and company passwords";
        }
        else{
            score = 6
            feedback.simple ="Reasonable; fairly secure passwords for network and company passwords";
        }
    }
    else if(result.score >= 59.1 && result.score <= 128){
        if(result.score < 83){
            score = 7;
            feedback.simple ="Strong; can be good for guarding financial information";
        }
        else if(result.score < 106){
            score = 8;
            feedback.simple ="Strong; can be good for guarding financial information";
        }
        else{
            score = 9;
            feedback.simple ="Strong; can be good for guarding financial information";
        }
    }
    else {
        score = 10;
        feedback.simple ="Very Strong; often overkill";
    }

    //Turn into object to get feedback in html
    feedback.suggestions = description;
    return {strength: score, description: formatFeedback(feedback)};
}

const name = "NIST Electronic Authentication Guidelines: Entropy"
const checker = {name, determineStrength};
export default checker;
