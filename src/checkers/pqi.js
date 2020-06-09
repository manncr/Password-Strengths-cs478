import React from "react";

const formatFeedback = feedback => {
    return (
      <>
        <p>{feedback.strength}</p>
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
  const determineStrength = password => {
    var feedback = {
      suggestions: [],
      strength: ""
    };
    var score = 10;
    var special = 0;
    var char = '';

    //Length > 8
        if(password.length < 8){
      feedback.suggestions.push("Use more than 8 characters");
      score -= 3;
    }
    
    //At least 3 special characters
    for(char of password){
      if(isNaN(char * 1) && !char.match(/[A-Z]/g) && !char.match(/[a-z]/g)){  //check if anything but special char
        if(!char.match(/[A-Z]/g) && !char.match(/[a-z]/g)){    //check if uppercase
          special++;
        }
      }
    }
    if(special < 3){
      feedback.suggestions.push("Use at least 3 special characters");
      score -= 3;
    }

    //Has alphanumeric characters
    if(special === password.length){
      feedback.suggestions.push("Use alphanumeric characters");
      score -= 3;
    }

    //String description of strength
    if(score === 4){feedback.strength = "Weak";}
    else if(score === 7){feedback.strength = "Okay";}
    else if(score === 10){feedback.strength = "Strong";}
    else{feedback.strength = "Very weak";}

    return { strength: score, description: formatFeedback(feedback) };
  };
  
  const name = "Password Quality Indicator";
  
  const checker = { name, determineStrength };
  
  export default checker;
  
