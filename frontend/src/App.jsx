import React, { useState, useEffect } from "react";
import axios from "axios";
import ReminderModal from "./components/ReminderModal";
import Gametab from "./components/game/Gametab";
import "./App.css";
import ReminderTab from "./components/reminder/ReminderTab";
import JournalTab from "./components/journal/JournalTab";
import AuthModule from "./components/auth/AuthModule";

const BASE_URL = "http://localhost:8000";

function App() {
  const [viewTab, setViewTab] = useState("");
  const [authInfo, setAuthInfo] = useState({
    isLoggedIn: false,
  });

  const displayTab = (tabName) => {
    setViewTab(tabName);
  };

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

  const renderTab = () => (
    <div className="tabs">
      {viewTab == "journal" && 
        <div className="journaltab">
          <JournalTab entries={[]} />
        </div>}
        {viewTab == "reminder" && <div className="remindertab">
          <ReminderTab />
        </div>}
        {viewTab == "game" && <Gametab />}
      </div>

    )

  // const refreshList = () => {
  //   axios
  //     .get(BASE_URL + "/api/reminders")
  //     .then((res) => {
  //       console.log(res);
  //       setReminderList(res.data)
  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   refreshList();
  // }, []);

  return (
    <main className="container">
      <h1 className="text-white text-uppercase text-center my-4">
        Alzheimer's Assistance App
      </h1>
      {authInfo.isLoggedIn ? (
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
      ) : (
        <AuthModule authInfo={authInfo} setAuthInfo={setAuthInfo} />
      )}
    </main>
  );
}

export default App;
