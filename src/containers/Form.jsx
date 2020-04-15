import React from "react";

const Form = ({ title, details, icon, children }) => {
  return (
    <form className="Form row">
      <div className={` text-dark text-center col-12`}>
        <i className={`mdi-${icon} mr-2 mdi-5x`}></i>
        <h3>{title}</h3>
        <small className="text-secondary text-center col">{details}</small>
      </div>
      <div className="col-12">
        {children}
      </div>
    </form>
  );
};

export default Form;
