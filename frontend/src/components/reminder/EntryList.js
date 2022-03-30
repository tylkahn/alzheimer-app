import React from 'react';
import Entry from './Entry';
// import Reminder from './Reminder';

class EntryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    // getList() {return this.state.list; }

    updateList(newList) { this.setState( {list: newList} ); }

    render() {
        const entryList = this.state.list.map((e) => <li key={e.id}> {e.title} </li>);
        return (
          <div className="entryList">
              {entryList}
          </div>
        );
    }
}

export default EntryList;