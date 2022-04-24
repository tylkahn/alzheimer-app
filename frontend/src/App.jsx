import React, { useState, useEffect } from "react";
import axios from "axios";
import Gametab from "./components/game/Gametab";
import "./App.css";
import ReminderTab from "./components/reminder/ReminderTab";
import JournalTab from "./components/journal/JournalTab";
import { nanoid } from "nanoid";
import AuthModule from "./components/auth/AuthModule";
import LogoutButton from "./components/auth/LogoutButton";

function App() {
  const [viewTab, setViewTab] = useState("journal");

  const [authInfo, setAuthInfo] = useState({
    username: "",
    isLoggedIn: false,
  });

  const displayTab = (tabName) => {
    setViewTab(tabName);
  };

  const renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={viewTab == "journal" ? "nav-link active" : "nav-link"}
          onClick={() => displayTab("journal")}
        >
          Journal
        </span>

        <span
          className={viewTab == "reminder" ? "nav-link active" : "nav-link"}
          onClick={() => displayTab("reminder")}
        >
          Reminders
        </span>

        <span
          className={viewTab == "game" ? "nav-link active" : "nav-link"}
          onClick={() => displayTab("game")}
        >
          Memory Game
        </span>
        <LogoutButton setAuthInfo={setAuthInfo} />
      </div>
    );
  };

  // If a tab is clicked, displays that tab
  const renderTab = () => (
    <div className="tabs">
      {viewTab == "journal" && (
        <div className="journaltab">
          <JournalTab entries={[]} />
        </div>
      )}
      {viewTab == "reminder" && (
        <div className="remindertab">
          <ReminderTab />
        </div>
      )}
      {viewTab == "game" && <Gametab />}
    </div>
  );

  const renderItems = () => {
    const newItems = reminderList.filter((item) => item.completed == viewTab);

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`reminder-title mr-2 ${
            viewTab ? "completed-reminder" : ""
          }`}
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
          <button className="btn btn-danger" onClick={() => deleteItem(item)}>
            Delete
          </button>
        </span>
      </li>
    ));
  };

  return (
    <main className="container">
      <h1 className="text-black text-uppercase text-center my-4">
        Alzheimer's Assistance App
      </h1>
      {authInfo.isLoggedIn ? (
        <div className="row">
          <div className="col-md-12 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              {renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {renderTab()}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <AuthModule authInfo={authInfo} setAuthInfo={setAuthInfo} />
      )}
    </main>
  );
}

export default App;
