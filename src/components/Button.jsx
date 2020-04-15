import React from "react";

const Button = ({ text, click, disabled }) => {
  return (
    <div className="Button row">
      <button
        disabled={disabled}
        type="button"
        onClick={() => click()}
        className={`p-2 border-0 ombre col-12 bg-dark white-text font-weight-bolder`}
      >
        <div className="row">
          <div className="col-12">{text}</div>
        </div>
      </button>
    </div>
  );
};

export default Button;
