import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Popup reminds users of reminders within 10 minutes of their specified time
class ReminderPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      title: this.props.title,
      date: this.props.date,
      toggle: true,
    }
    this.toggle = this.toggle.bind(this)
    // console.log("ReminderPopup:", this.state);
  };

  // Used for exit button on reminder
  toggle() {
    this.setState( prevState => ({toggle: !prevState.toggle}))
    this.forceUpdate()
  }

  render() {
    return (
      <div>
        {this.state.toggle ? (
          <div className='popup'>
            <div className='popup-title'>
              {this.state.title}  
              <button className='popup-delete' onClick={this.toggle} type='submit'> <FontAwesomeIcon icon="trash-can" /> </button>
            </div> 
            <div className='popup-date'>
                {new Date(this.state.date).toString()}
              </div>
          </div>
        ) : null }
      </div>
    );
  }
}

export default ReminderPopup;