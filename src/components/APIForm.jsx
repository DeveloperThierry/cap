import React, { useState } from "react";

const APIForm = ({ inputs, handleChange, onSubmit }) => {
  const inputsInfo = [
    "Input a link to any website you would like to take a screenshot of. Do not include https or any protocol in the URL",
    "Input which image format you would prefer for your screenshot: jpeg, png, or webp",
    "Input true or false if you would like your website screenshot to not contain any ads",
    "Input true or false if you would like your website screenshot to not contain of those annoying 'allow cookies' banners",
    "Choose the width of your screenshot (in pixels)",
    "Choose the height of your screenshot (in pixels)",
  ];


  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(e)
  }
  return (
    <div>
      <p>Ditch F12 keyboard presses and right mouse clicks for SnapIO</p>
      <form action="" className="form-container">
        {inputs &&
          Object.entries(inputs).map(([category, value], index) => (
            <li className="form" key={index}>
              <h2>{category} </h2>
              <input
                type="text"
                name={category}
                value={value}
                placeholder="Input this attribute..."
                onChange={handleChange}
                className="textbox"
              />
              <br></br>
              <br></br>
              <p> {inputsInfo[index]}</p>
            </li>
          ))}
        <button className="button" onClick={handleSubmit}>
          Take that Pic!
        </button>
      </form>
    </div>
  );
};

export default APIForm;
