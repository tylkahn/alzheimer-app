import React, { useState, useEffect } from 'react';
import axios from "axios";
import ReminderModal from "./components/ReminderModal";
import Gametab from "./components/game/Gametab"
import './App.css';
import ReminderTab from './components/reminder/ReminderTab'

const BASE_URL = 'http://localhost:8000'

function App() {
  const [viewTab, setViewTab] = useState("");
  const [reminderList, setReminderList] = useState([]);
  const [modal, setModal] = useState(false);
  const [activeItem, setActiveItem] = useState(
    {
      title: "",
      reminderType: "",
      date: "",
      repeating: "",
      description: "",
      completed: false,
    }
  );

  const displayTab = (tabName) => {
    setViewTab(tabName);
  }

  const renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={viewTab ? "nav-link active" : "nav-link"}
          onClick={() => displayTab("reminder")}
        >
          Reminder
        </span>
        <span
          className={viewTab ? "nav-link active" : "nav-link"}
          onClick={() => displayTab("journal")}
        >
          Journal
        </span>
        <span
          className={viewTab ? "nav-link" : "nav-link active"}
          onClick={() => displayTab("game")}
        >
          Game
        </span>
      </div>
    );
  };

  const renderTab = () => {
    return (
      <div className="tabs">
        {viewTab == "journal" && <div className="journaltab">
          <JournalTab entries={
            [
              { id: nanoid(4), title: "title1", description: "desc1" },
              { id: nanoid(4), title: "title2", description: "desc2" },
            ]
          } />
        </div>}
        {viewTab == "reminder" && <div className="remindertab">
          <ReminderTab />
          <main className="container">
            <h1 className="text-white text-uppercase text-center my-4">Reminder app</h1>
            <div className="row">
              <button
                className="btn btn-primary"
                onClick={createItem}
              >
                Add task
              </button>
            </div>
            <ul className="list-group list-group-flush border-top-0">
              {renderItems()}
            </ul>
            {modal ? (
              <ReminderModal
                activeItem={activeItem}
                toggle={toggle}
                onSave={handleSubmit}
              />
            ) : null}
          </main>
        </div>}
        {viewTab == "game" && <Gametab />}
      </div>

    )
  };

  const handleSubmit = (item) => {
    console.log("handleSubmit");
    toggle();
    console.log(item);

    // NOTE: let it be known that I very much dislike using axios.put and axios.delete
    if (item.id) {
      axios
        .put(BASE_URL + `/api/reminders/${item.id}/`, item)
        .then(() => refreshList());
    } else {
      axios
        .post(BASE_URL + "/api/reminders/", item)
        .then(() => refreshList());
    }
  };

  const deleteItem = (item) => {
    axios
      .delete(BASE_URL + `/api/reminders/${item.id}/`)
      .then(() => refreshList());
  };

  const createItem = () => {
    const item = { title: "", reminderType: "", date: "", repeating: "", description: "", completed: false };
    console.log("created item")
    setActiveItem(item);
    toggle();
  };

  const editItem = (item) => {
    setActiveItem(item);
    console.log(item);
    toggle();
  };

  const refreshList = () => {
    axios
      .get(BASE_URL + "/api/reminders")
      .then((res) => {
        console.log(res);
        setReminderList(res.data)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    refreshList();
  }, []);

  const toggle = () => {
    setModal(!modal)
  };

  const renderItems = () => {
    const newItems = reminderList.filter(
      (item) => item.completed == viewCompleted
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`reminder-title mr-2 ${viewCompleted ? "completed-reminder" : ""}`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => deleteItem(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  return (
    <main className="container">
      <h1 className="text-white text-uppercase text-center my-4">Alzheimer's Assistance App</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            {renderTabList()}
            <ul className="list-group list-group-flush border-top-0">
              {renderTab()}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
