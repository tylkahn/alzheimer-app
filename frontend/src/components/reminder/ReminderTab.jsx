import React from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Reminder from "./Reminder";
import ReminderModal from "./ReminderModal";
import ReminderPopup from "./ReminderPopup";

/* eslint-disable react/destructuring-assignment */

class ReminderTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entryList: [],
      searchText: "",
      modal: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // on the first run of the page
  componentDidMount() {
    const savedEntries = JSON.parse(
      localStorage.getItem("react-reminder-data")
    );
    // if there exist items in the localStorage, save it as our state
    if (savedEntries) {
      this.state.entryList = savedEntries;
    }

    this.forceUpdate();
  }

  // on each change to the page
  componentDidUpdate() {
    localStorage.setItem(
      "react-reminder-data",
      JSON.stringify(this.state.entryList)
    );
  }

  // Sort entryList by date (most recent to least recent)
  sortByDate = () => {
    // this.setState({
    //     entryList: this.state.entryList.sort((a, b) => (a.date > b.date) ? 1 : -1)
    // });
    this.setState((prevState) => ({
      entryList: prevState.entryList.sort((a, b) => (a.date > b.date ? 1 : -1)),
    }));
    this.forceUpdate();
  };

  // Updates search text
  Search = (event) => {
    this.setState({
      searchText: event.target.value,
    });
    // console.log(this.state.searchText);
  };

  // Adds entry to list
  handleSubmit = (item) => {
    // console.log("handleSubmit");
    // console.log("item:", item);

    this.toggle();

    this.state.entryList.push(item);
    // console.log("entryList:",this.state.entryList);

    if (this.state.entryList.length === 1) {
      axios.post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/reminders/list`,
        [item]
      );
    } else {
      this.updateList(this.state.entryList);
    }

    this.sortByDate();
  };

  // Opens or closes modal
  toggle = () => {
    this.setState((prevState) => ({ modal: !prevState.modal }));
  };

  // Removes entries from list, called when delete button is clicked
  deleteEntry(entry) {
    let b = false;
    for (let i = 0; i < this.state.entryList.length; i += 1) {
      if (b) break;
      if (this.state.entryList[i] === entry) {
        this.state.entryList.splice(i, 1);
        b = true;
      }
    }
    this.updateList(this.state.entryList);
    this.sortByDate();
    this.forceUpdate();
  }

  // Deletes then creates new entry in list, called when edit button is clicked
  editEntry(entry) {
    this.deleteEntry(entry);
    this.toggle();
    this.updateList(this.state.entryList);
    this.sortByDate();
    this.forceUpdate();
  }

  // post the list to the db
  // eslint-disable-next-line class-methods-use-this
  updateList(l) {
    axios.delete(`${process.env.REACT_APP_SERVER_BASE_URL}/api/reminders/list`);
    const item = { list: l };
    axios.post(
      `${process.env.REACT_APP_SERVER_BASE_URL}/api/reminders/list`,
      item
    );
  }

  // Checks if a reminder is set within 10 minutes of the current time
  // eslint-disable-next-line class-methods-use-this
  isValidPopup(popup) {
    const currentDate = new Date();
    const popupDate = new Date(popup.date);
    const diffMinute = Math.abs(popupDate - currentDate) / (1000 * 60);
    // console.log("diffMinute:",diffMinute);
    // console.log("currentDate:",currentDate);
    // console.log("popupDate:",popupDate);
    if (diffMinute < 10) {
      // console.log('valid popup')
      return true;
    }

    // console.log('invalid popup')
    return false;
  }

  render() {
    // FACADE DESIGN PATTERN: ReminderTab (facade) shows an interface for clients to interact with
    return (
      <div>
        <div>
          {/* Popup at top of page */}
          {this.state.entryList
            .filter((e) => this.isValidPopup(e))
            .map((entry) => (
              <div key={nanoid(8)}>
                <ReminderPopup
                  type={entry.reminderType}
                  title={entry.title}
                  date={entry.date}
                  key={nanoid(8)}
                  // FACADE DESIGN PATTERN: ReminderTab interacts with ReminderPopup subsystem to display reminder popups
                />
              </div>
            ))}
        </div>
        <div className="reminder">
          <div /> <br />
          <div className="search">
            <FontAwesomeIcon icon="magnifying-glass" />
            <input onChange={this.Search} type="text" />
          </div>
          {/* Button to add task, if pressed, modal pops up */}
          <div className="container">
            <button type="submit" className="delete" onClick={this.toggle}>
              <FontAwesomeIcon icon="square-plus" />
            </button>
            {this.state.modal ? (
              // DEPENDENCY INJECTION DESIGN PATTERN: ReminderTab calls on the Injector Class ReminderModal
              // FACADE DESIGN PATTERN: ReminderTab interacts with ReminderModal subsystem to create a new reminder
              <ReminderModal toggle={this.toggle} onSave={this.handleSubmit} />
            ) : null}
          </div>{" "}
          <br />
          {/* Loop through all reminders and display them */}
          {/* {this.getList()} */}
          {this.state.entryList
            .filter((e) =>
              e.title
                .toLowerCase()
                .concat(e.reminderType.toLowerCase())
                .includes(this.state.searchText)
            )
            .map((entry) => (
              <div className="reminder-entry" key={nanoid(8)}>
                <Reminder
                  id={entry.id}
                  title={entry.title}
                  reminderType={entry.reminderType}
                  date={entry.date}
                  repeating={entry.repeating}
                  description={entry.description}
                  key={nanoid(8)} // each entry needs a unique id for rendering, not just db
                  // FACADE DESIGN PATTERN: ReminderTab interacts with Reminder subsystem to display reminders
                />
                <br />
                <span>
                  <button
                    type="submit"
                    onClick={() => this.editEntry(entry)}
                    className="edit"
                    key={nanoid(8)}
                  >
                    <FontAwesomeIcon icon="pen-to-square" />
                  </button>
                  <button
                    type="submit"
                    onClick={() => this.deleteEntry(entry)}
                    className="delete"
                    key={nanoid(8)}
                  >
                    <FontAwesomeIcon icon="trash-can" />
                  </button>
                </span>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default ReminderTab;
