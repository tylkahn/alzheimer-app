import React from "react";
import EntryList from './EntryList'
import {useState} from 'react';

class JournalTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entryList: {"id": "", "title": "", "description": "", "images": [],
                "lastUpdated": 0, "tagList": []}
        };
    }
    
    setJournalLastUpdated(time){
        this.setState(
            { lastUpdated: time }
        );
    }

    modifyTitle(t){
        this.setState(
            { title: t }
        );
    }

    modifyDescription(desc){
        this.setState(
            { description: desc }
        );
    }

    modifyImageList(action, jpg){
        if (action === "addImage"){
            this.setState(
                { images: [...jpg] }
            );
        }
        else if (action === "removeImage"){

        }
    }

    render() {
        return (
          <div className="journal">
            Journal tab stuff here:
            <EntryList />
          </div>
        );
    }
}

export default JournalTab;