import React from "react";

import "./PasswordIndicatorGridPlaceholder.css";

function PasswordIndicatorGridPlaceholder(props) {
  console.log("placeholder");
  return (
    <div className="password-grid placeholder">
      {Array.from({ length: 4 }, (x, i) => i).map(i => (
        <div className="password-strength placeholder" key={i}></div>
      ))}
    </div>
  );
}

export default PasswordIndicatorGridPlaceholder;
