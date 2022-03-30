import React, {useState, useEffect} from 'react';
// import {
//     Button,
//     Modal,
//     ModalHeader,
//     ModalBody,
//     ModalFooter,
//     Form,
//     FormGroup,
//     Input,
//     Label,
//   } from "reactstrap";
import EntryList from './EntryList';

class ReminderTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entryList: {"id": "", "title": "", "reminderType": "", "date": "", 
                "repeating": "", "description": "", "images": [],
                "lastUpdated": 0, "tagList": []}
        };
    }

    setReminderLastUpdated(time){
        this.setState(
            { lastUpdated: time }
        );
    }

    modifyTitle(t){
        this.setState(
            { title: t }
        );
    }

    modifyReminderType(t){
        this.setState(
            { reminderType: t }
        );
    }

    modifyDate(d){
        this.setState(
            { date: d }
        );
    }

    modifyRepeating(r){
        this.setState(
            { repeating: r }
        );
    }

    modifyDescription(desc){
        this.setState(
            { description: desc }
        );
    }

    render() {

        return (
            <div className="reminder">
                Reminder Stuff Here:      
            </div>
          );
      }
}

export default ReminderTab;