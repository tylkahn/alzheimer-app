import React from 'react';
import Entry from './Entry';

// Reminder Class inherits Entry Class
class Reminder extends Entry {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            reminderType: this.props.reminderType,
            date: this.props.date,
            repeating: this.props.repeating,
            description: this.props.description,
            modal: false,
        };
        // Bind all setter functions 
        this.setTitle = this.setTitle.bind(this);
        this.setType = this.setType.bind(this);
        this.setDate = this.setDate.bind(this);
        this.setRepeating = this.setRepeating.bind(this);
        this.setDescription = this.setDescription.bind(this);
        console.log("Reminder:", this.state);
    }
  
    // Getter functions
    getTitle() {return this.state.title; }

    getType() {return this.state.reminderType; }

    getDate() {return this.state.date; }
  
    getRepeating() {return this.state.repeating; }

    getDescription() {return this.state.description; }
    
    // Setter functions
    setTitle = (t) => { this.setState( {title: t} ); }

    setType = (t) => { this.setState( {type: t} ); }

    setDate = (d) => { this.setState( {date: d} ); }

    setRepeating = (r) => { this.setState( {repeating: r} ); }

    setDescription = (d) => { this.setState( {description: d} ); }
    
    // Toggle modal to create a new class in ReminderTab
    toggle = () => {
      this.setState( {modal: !this.state.modal})
    };
  
    // Display Reminder in ReminderTab
    render() {
      return (
        <div className='Reminder'>
          <h2
            className="reminder-title mr-2"
            title={this.getTitle()}
          >
            {this.getTitle()}
          </h2>
          <h6
            className="reminder-date mr-2"
            title={this.getDate()}
          >
            Date: {new Date(this.getDate()).toString()} 
          </h6>
          <h6
            className="reminder-repeating mr-2"
            title={this.getRepeating()}
          >
            Repeating: {this.getRepeating()} 
          </h6>
          <span
            className="reminder-description mr-2"
            title={this.getDescription()}
          > 
            <b> {this.getType()} </b> {this.getDescription()} 
          </span>
        </div>
      );
    }
  
  }
  
export default Reminder;