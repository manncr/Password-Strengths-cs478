

const formatFeedback = feedback => {
    if (!feedback.warning && !feedback.suggestions) {
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

const entropy = (password) =>{
    const length = password.length;
    const score = 0;
    //general entropy
    
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
    var i = 0;
    var uppercase = false;
    var special = false;
    while(i < length){
        var char = password.At(i);
        if(isNaN(char * 1)){   //turns from char to int, checks if numeric
            console.log("--Regex check: ", char.match(/[A-Z]/i), " char= ", char);
            if(char.match(/[A-Z]/i)){    //regex to check if alpha
                uppercase = true;
            }
            else{   //else it's a special character
                special = true;
            }
        }
    }

    //Dictionary check. +3 if substring matches, +6 if no match
    //TODO: ^^

    
    
};

