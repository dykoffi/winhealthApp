import React from "react";
import PropTypes from "prop-types"

const Text = ({text}) => (
  <div className="text-secondary text-center">
    <small className='text-center'>{text}</small>
  </div>
);

Text.prototype = {
  text : PropTypes.string.isRequired
}

export default Text