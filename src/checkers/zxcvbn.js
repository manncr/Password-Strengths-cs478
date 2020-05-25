import React from "react";
import zxcvbn from "zxcvbn";

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
const determineStrength = password => {
  const { feedback, score } = zxcvbn(password);
  return { strength: (score + 1) * 2, description: formatFeedback(feedback) };
};

const name = "zxcvbn";

const checker = { name, determineStrength };

export default checker;
