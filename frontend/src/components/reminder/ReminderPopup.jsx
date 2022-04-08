import React from 'react';

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
    console.log("ReminderPopup:", this.state);
  };

  // Used for exit button on reminder
  toggle() {
    this.setState( {toggle: !this.state.toggle} )
  }

  render() {
    return (
      <div>
        {this.state.toggle ? (
          <div className='popup'>
            <div className='popup-title'>
              {this.state.title} 
              &nbsp;&nbsp;<button className="btn btn-danger" onClick={this.toggle}> x </button> <br/>
              <div className='popup-date'>
                {new Date(this.state.date).toString()}
              </div>
            </div> 
          </div>
        ) : null }
      </div>
    );
  }
}

export default ReminderPopup;