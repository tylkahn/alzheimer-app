import React from 'react';
import Entry from './Entry';

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
            // lastUpdated: 0,
            // tagList: [],
        };
        this.setTitle = this.setTitle.bind(this);
        this.setType = this.setType.bind(this);
        this.setDate = this.setDate.bind(this);
        this.setRepeating = this.setRepeating.bind(this);
        this.setDescription = this.setDescription.bind(this);
        console.log("Reminder:", this.state);
    }
  
    getTitle() {return this.state.title; }

    getType() {return this.state.reminderType; }
    
    getDate() {return this.state.date; }
    
    getRepeating() {return this.state.repeating; }
    
    getDescription() {return this.state.description; }
    
    setTitle = (t) => { this.setState( {title: t} ); }
    
    setType = (t) => { this.setState( {type: t} ); }
    
    setDate = (d) => { this.setState( {date: d} ); }
    
    setRepeating = (r) => { this.setState( {repeating: r} ); }
    
    setDescription = (d) => { this.setState( {description: d} ); }
  
    render() {
      return (
        <div className='Reminder'>
          <h2
            className={`reminder-title mr-2`}
            title={this.getTitle()}
          >
            {this.getTitle()}
          </h2>
          <h4
            className={`reminder-date mr-2`}
            title={this.getDate()}
          >
            {this.getDate()}
          </h4>
          <h6
            className={`reminder-description mr-2`}
            title={this.getDescription()}
          > 
            {this.getDescription()} 
          </h6>
          <span>
            <button
              className="btn btn-secondary mr-2"
              // onClick={() => editItem(item)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              // onClick={() => deleteItem(item)}
            >
              Delete
            </button>
          </span>
        </div>
      );
    }
  
  }
  
export default Reminder;