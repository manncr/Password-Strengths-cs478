import React from "react";

import "./PasswordIndicatorGrid.css";
import { StrengthIndicator } from "./components/PasswordStrengthIndicator";

function PasswordIndicatorGrid(props) {
  let indicators = [
    {
      name: "Basic Indicator",
      determineStrength: password => {
        password = password || "";
        const strength = Math.min(password.length, 10);
        let description = "weak";
        if (strength > 4 && strength < 7) {
          description = "okay";
        } else if (strength >= 7) {
          description = "strong";
        }

        return { strength, description };
      }
    }
  ];

  indicators = [...indicators, ...indicators, ...indicators, ...indicators];

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

export { PasswordIndicatorGrid };
