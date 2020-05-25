import React, { useState, lazy, Suspense } from "react";

import "./App.css";
import { PasswordInput } from "./PasswordInput";
import PasswordIndicatorGridPlaceholder from "./PasswordIndicatorGridPlaceholder";
const PasswordIndicatorGrid = lazy(() => import("./PasswordIndicatorGrid"));

function App() {
  const [password, updatePassword] = useState("");
  return (
    <div className="App">
      <header className="App-header">
        <h1>Password Strength Meters</h1>
      </header>
      <main>
        <PasswordInput password={password} updatePassword={updatePassword} />
        <Suspense fallback={<PasswordIndicatorGridPlaceholder />}>
          <PasswordIndicatorGrid password={password} />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
