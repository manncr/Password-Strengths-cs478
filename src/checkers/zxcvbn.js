import React from "react";
import zxcvbn from "zxcvbn";

const formatFeedback = feedback => {
  if (!feedback.warning && !feedback.suggestions) {
    return <p></p>;
  }
  return (
    <>
      <p>{feedback.warning}</p>
      {feedback.suggestions && (
        <ol>
          {feedback.suggestions.map(suggestion => (
            <li key={suggestion}>{suggestion}</li>
          ))}
        </ol>
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
