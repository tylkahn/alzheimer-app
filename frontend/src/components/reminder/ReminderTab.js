import React, {useState, useEffect} from 'react';
import {nanoid} from 'nanoid';
// import EntryList from './EntryList';
// import ReminderList from './ReminderList';
import Reminder from './Reminder';
import ReminderModal from './ReminderModal'

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

    addEntry(entry){
        this.state.entryList.push(entry);
        this.setState( {activeEntry: entry} );
        this.forceUpdate();
    }
    
    editEntry(entry){
        this.deleteEntry(entry);
        this.toggle();
        this.forceUpdate();
    };

    toggle = () => {
        this.setState( {modal: !this.state.modal})
    };
    
    handleSubmit = (item) => {
        console.log("handleSubmit");
        console.log("item:", item);

        this.toggle();

        this.state.entryList.push(item);
        console.log("entryList:",this.state.entryList);
    };

    // handleSearchTypeChange(event) {
    //     this.setState({searchType: event.target.value});
    // }
        
    Search = (event) => {
        this.setState({
            searchText: event.target.value,
            //displayList: this.state.entryList.filter(
            //    (entry)=>entry.state.title.toLowerCase().includes(searchText)
            //),
        });
        console.log(this.state.searchText);
    }

    render = () =>{

        return (
            <div className="reminder" onChange="">
                {/* <div className='search-type'>
                    <select value={this.state.searchType} onChange={this.handleSearchTypeChange}>
                        <option value="title"> Title </option>
                        <option value="reminderType"> Type </option>
                    </select>
                </div> */}
                <div className='search'>
                    <input onChange={this.Search} type="text" placeholder='type to search...'/>
                </div>
                <main className="container">
                    <button
                        className="btn btn-primary"
                        onClick={this.toggle}
                    >
                        Add task
                    </button>
                    {/* <ul className="list-group list-group-flush border-top-0">
                    {renderItems()}
                    </ul> */}
                    {this.state.modal ? (
                    <ReminderModal
                        // activeItem={new Reminder}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                        // setActiveItem={setActiveItem}
                    />
                    ) : null}
                </main>

                {this.state.entryList.filter((e) => (e.title).toLowerCase().concat((e.reminderType).toLowerCase()).includes(this.state.searchText)).map(entry => (
                    <div> 
                        <Reminder
                            id={entry.id}
                            title={entry.title} 
                            reminderType={entry.reminderType}
                            date={entry.date}
                            repeating={entry.repeating}
                            description={entry.description}
                            key={nanoid(8)} //each entry needs a unique id for rendering, not just db
                        />
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
          );
    }
}

export default ReminderTab;