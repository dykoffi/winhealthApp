import React from "react";

const Loading = ({text}) => (
  <div className="text-secondary text-center">
    <small
      className="spinner-border spinner-border-sm mr-3 text-center"
      role="status"
      aria-hidden="true"
    ></small>
    {text} ...
  </div>
);


export default Loading