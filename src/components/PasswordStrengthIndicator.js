import React from "react";

import "./PasswordStrengthIndicator.css";

function getColor(strength) {
  if (strength < 3) {
    return "red";
  }
  if (strength < 5) {
    return "orange";
  }
  if (strength < 7) {
    return "yellow";
  }
  return "green";
}

function StrengthIndicator(props) {
  const { strength, description } = props.determineStrength(props.password);
  if (strength < 1 || strength > 10) {
    throw new Error("strength is out of bounds 0>=strength>=10");
  }
  const color = getColor(strength);
  return (
    <div className="password-strength">
      <h3>{props.name}</h3>
      <svg
        viewBox="0 0 300 10"
        alt={`Password strength rating: ${strength}/10`}
      >
        <rect fill="#ddd" x="0" y="0" width="300" height="10" />
        <rect fill={color} y="0" width={strength * 30} height="10"></rect>
      </svg>
      <div className="description">{description}</div>
    </div>
  );
}

export { StrengthIndicator };
