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
            searchText: '',
            modal: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    addEntry(entry){
        this.state.entryList.push(entry);
        this.setState( {activeEntry: entry} );
        this.forceUpdate();
    }

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
                <div className='search'>
                    <input onChange={this.Search} type="text" placeholder='type to search...'/>
                </div>
                <main className="container">
                    <button
                        className="btn add-task"
                        // onClick={this.addEntry}
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

                {this.state.entryList.filter((e) => (e.title).toLowerCase().includes(this.state.searchText)).map(entry => (
                    <Reminder
                        id={entry.id}
                        title={entry.title} 
                        reminderType={entry.reminderType}
                        date={entry.date}
                        repeating={entry.repeating}
                        description={entry.description}
                        key={nanoid(8)} //each entry needs a unique id for rendering, not just db
                    />
                    ),
                    
                )}
            </div>
          );
    }
}

export default ReminderTab;