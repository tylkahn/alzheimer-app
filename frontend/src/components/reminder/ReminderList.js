import React from 'react';
import Reminder from './Reminder';

class ReminderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    addReminder(r) {
        this.state.list.push(r)
    }

    getList() {return this.state.list; }

}

export default ReminderList;