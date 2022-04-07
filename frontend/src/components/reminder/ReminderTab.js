import React, {useState, useEffect} from 'react';
import {nanoid} from 'nanoid';
import Reminder from './Reminder';
import ReminderModal from './ReminderModal'
import ReminderPopup from './ReminderPopup';

class ReminderTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entryList: [],
            /*{"id": "", "title": "", "reminderType": "", "date": "", 
                "repeating": "", "description": "", "images": [],
                "lastUpdated": 0, "tagList": []}*/
            activeEntry: '',
            searchType: '',
            searchText: '',
            modal: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // Removes entries from list, called when delete button is clicked
    deleteEntry(entry) {
        let b = false;
        for (var i = 0; i < this.state.entryList.length; i++) {
            if (b) break;
            if (this.state.entryList[i] == entry) {
                this.state.entryList.splice(i, 1);
                b = true;
            }
        }
        this.forceUpdate();
    }
    
    // Deletes then creates new entry in list, called when edit button is clicked
    editEntry(entry){
        this.deleteEntry(entry);
        this.toggle();
        this.forceUpdate();
    };

    // Opens or closes modal
    toggle = () => {
        this.setState( {modal: !this.state.modal})
    };
    
    // Adds entry to list
    handleSubmit = (item) => {
        console.log("handleSubmit");
        console.log("item:", item);

        this.toggle();

        this.state.entryList.push(item);
        console.log("entryList:",this.state.entryList);
    };

    // TODO: Choose which aspect of a reminder to search for (ie: title, tagList, type, etc.)
    // handleSearchTypeChange(event) {
    //     this.setState({searchType: event.target.value});
    // }
        
    // Updates search text
    Search = (event) => {
        this.setState({
            searchText: event.target.value,
        });
        console.log(this.state.searchText);
    }

    // Checks if a reminder is set within 10 minutes of the current time
    isValidPopup(popup) {
        let currentDate = new Date();
        let popupDate = new Date(popup.date)
        let diffMinute = Math.abs(popupDate - currentDate) / (1000 * 60);
        // console.log("diffMinute:",diffMinute);
        // console.log("currentDate:",currentDate);
        // console.log("popupDate:",popupDate);
        if (diffMinute < 10) {
            console.log('valid')
            return true
        }
        else {
            console.log('invalid')
            return false
        }
    }

    render = () =>{

        return (
            <div>    
                <div>
                    {/* Popup at top of page */}
                    {this.state.entryList.filter((e) => this.isValidPopup(e) ).map(entry => (
                        <div>
                            <ReminderPopup
                                type={entry.reminderType}
                                title={entry.title}
                                date={entry.date}
                                key={nanoid(8)}
                            />
                        </div> 
                        ),
                        
                    )}
                </div>          
                <div className="reminder" onChange="">
                    {/* TODO: <div className='search-type'>
                        <select value={this.state.searchType} onChange={this.handleSearchTypeChange}>
                            <option value="title"> Title </option>
                            <option value="reminderType"> Type </option>
                        </select>
                    </div> */}
                    <div>
                    </div> <br/>
                    {/* Search bar */}
                    <div className='search'>
                        <input onChange={this.Search} type="text" placeholder='type to search...'/>
                    </div>
                    {/* Button to add task, if pressed, modal pops up */}
                    <div className="container">
                        <button
                            className="btn btn-primary"
                            onClick={this.toggle}
                        >
                            Add task
                        </button>
                        {this.state.modal ? (
                        <ReminderModal
                            toggle={this.toggle}
                            onSave={this.handleSubmit}
                        />
                        ) : null}
                    </div> <br/>
                    
                    {/* Loop through all reminders and display them */}
                    {this.state.entryList.filter((e) => (e.title).toLowerCase().concat((e.reminderType).toLowerCase()).includes(this.state.searchText)).map(entry => (
                        <div className='reminder-entry'> 
                            <Reminder
                                id={entry.id}
                                title={entry.title} 
                                reminderType={entry.reminderType}
                                date={entry.date}
                                repeating={entry.repeating}
                                description={entry.description}
                                key={nanoid(8)} //each entry needs a unique id for rendering, not just db
                            /><br/>
                            <span>
                            <button
                                className="btn btn-secondary mr-2"
                                onClick={() => this.editEntry(entry)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => this.deleteEntry(entry)}
                            >
                                Delete
                            </button>
                            </span>
                        </div>
                        
                        ),

                    )}
                </div>
            </div>
          );
    }
}

export default ReminderTab;