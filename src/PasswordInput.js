import React, { useState } from "react";

import "./PasswordInput.css";
import { LargeInput } from "./components/Input";

function PasswordInput(props) {
  return (
    <div className="password-input">
      <form>
        <LargeInput
          label="Enter password:"
          type="password"
          value={props.password}
          id="password"
          onChange={e => props.updatePassword(e.target.value)}
        />
      </form>
    </div>
  );
}

export { PasswordInput };
