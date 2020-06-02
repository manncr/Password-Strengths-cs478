import React from "react";

import "./PasswordIndicatorGrid.css";
import { StrengthIndicator } from "./components/PasswordStrengthIndicator";
import zxcvbn from "./checkers/zxcvbn";

function PasswordIndicatorGrid(props) {
  let indicators = [
    {
      name: "Basic Indicator",
      determineStrength: password => {
        password = password || "";
        const strength = Math.min(password.length, 10);
        let descriptionText = "weak";
        if (strength > 4 && strength < 7) {
          descriptionText = "okay";
        } else if (strength >= 7) {
          descriptionText = "strong";
        }

        const description = <p>{descriptionText}</p>;

        return { strength, description };
      }
    },
    zxcvbn
  ];

  return (
    <div className="password-grid">
      {indicators.map(indicator => (
        <StrengthIndicator
          name={indicator.name}
          determineStrength={indicator.determineStrength}
          password={props.password}
        />
      ))}
    </div>
  );
}

export default PasswordIndicatorGrid;
