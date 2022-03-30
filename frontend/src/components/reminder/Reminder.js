import Entry from './Entry';

class Reminder extends Entry {
    constructor(props) {
        super(props);
        this.state = {
            id: "0",
            title: "The Title",
            reminderType: "Reminder Type",
            date: "The Date",
            repeating: "Repeating",
            description: "The description",
            lastUpdated: 0,
            tagList: [],
        };
    }
  
    getDate() {return date; }
    getRepeating() {return repeating; }
  
    render() {
      return (
        <div className="reminder">
          <span>This is a reminder entry!</span>
            <div className="reminder-footer">
              <small>Edit</small>
            </div>
        </div>
      );
    }
  
  }
  
export default Reminder;