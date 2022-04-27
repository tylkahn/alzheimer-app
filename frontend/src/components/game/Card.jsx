import React from "react";
import PropTypes from "prop-types";

// render a card with proper styling
function Card(props) {
  const { status, onClick, active, value } = props;
  const style = status ? "matching" : active ? "game-active" : "gamecard"; // eslint-disable-line no-nested-ternary
  return (
    <button type="button" className={style} onClick={onClick}>
      {value}
    </button>
  );
}
Card.propTypes = {
  status: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default Card;
