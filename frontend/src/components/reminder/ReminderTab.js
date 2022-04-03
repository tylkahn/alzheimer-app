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
            entryList: this.props.entries,
            /*{"id": "", "title": "", "reminderType": "", "date": "", 
                "repeating": "", "description": "", "images": [],
                "lastUpdated": 0, "tagList": []}*/
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.entries !== prevProps.entries) {
            this.state.entryList = this.props.entries;
        }
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

    render = () =>{

        return (
            <div className="reminder" onChange="">
                title: {this.state.entryList[0].title}<br/>
                reminderType: {this.state.entryList[0].reminderType} <br/>
                description: {this.state.entryList[0].description}<br/>
                completed: {this.state.entryList[0].completed.toString()}<br/>
                date: {this.state.entryList[0].date}<br/>
                repeating: {this.state.entryList[0].repeating}<br/>
            </div>
          );
      }
}

export default ReminderTab;