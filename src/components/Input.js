import React from "react";

import "./Input.css";

function Input(props) {
  console.log("input");
  console.log(props);
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        value={props.value}
        type={props.type}
        onChange={props.onChange}
      ></input>
    </>
  );
}

function LargeInput(props) {
  console.log("input");
  console.log(props);
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        className="input-lg"
        id={props.id}
        value={props.value}
        type={props.type}
        onChange={props.onChange}
      ></input>
    </>
  );
}

export { Input, LargeInput };
