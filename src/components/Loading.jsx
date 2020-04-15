import React from "react";

const Loading = ({text}) => (
  <div className="text-secondary text-center">
    <span
      className="spinner-border spinner-border-sm mr-3 text-center"
      role="status"
      aria-hidden="true"
    ></span>
    {text} ...
  </div>
);


export default Loading