import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Popup reminds users of reminders within 10 minutes of their specified time
class ReminderPopup extends React.Component {
  constructor(props) {
    super(props);
    const { title, date } = this.props;
    this.state = {
      title,
      date,
      toggle: true,
    };
    this.toggle = this.toggle.bind(this);
    // console.log("ReminderPopup:", this.state);
  }

  // Used for exit button on reminder
  toggle() {
    this.setState((prevState) => ({ toggle: !prevState.toggle }));
    this.forceUpdate();
  }

  render() {
    const { toggle, title, date } = this.state;
    return (
      <div>
        {toggle ? (
          <div className="popup">
            <div className="popup-title">
              {title}
              <button
                className="popup-delete"
                onClick={this.toggle}
                type="submit"
              >
                {" "}
                <FontAwesomeIcon icon="trash-can" />{" "}
              </button>
            </div>
            <div className="popup-date">{new Date(date).toString()}</div>
          </div>
        ) : null}
      </div>
    );
  }
}
ReminderPopup.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.oneOf(["Date", "string"]).isRequired,
};

export default ReminderPopup;
