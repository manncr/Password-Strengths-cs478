import React, { useState } from "react";

import "./App.css";
import { PasswordInput } from "./PasswordInput";
import { PasswordIndicatorGrid } from "./PasswordIndicatorGrid";

function App() {
  const [password, updatePassword] = useState("");
  return (
    <div className="App">
      <header className="App-header">
        <h1>Password Strength Meters</h1>
      </header>
      <main>
        <PasswordInput password={password} updatePassword={updatePassword} />
        <PasswordIndicatorGrid password={password} />
      </main>
    </div>
  );
}

export default App;
