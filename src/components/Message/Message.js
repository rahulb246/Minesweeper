// Author : Rahul Bojanapally

import React from "react";
import PropTypes from "prop-types";

/**
 * A basic component for showing simple messages
 * @param {object} props Component props
 * @param {string} props.text text that needs to be shown
 * @param {string} props.textColor color of the text
 */
const Message = (props) => {
  const { text, textColor } = props;
  return <p style={{ color: textColor }}>{text}</p>;
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired
};

Message.defaultProps = {
  text: "",
  textColor: ""
};

export default Message;
