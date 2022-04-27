import React, { useState } from "react";
import Gametab from "./components/game/Gametab";
import "./App.css";
import ReminderTab from "./components/reminder/ReminderTab";
import JournalTab from "./components/journal/JournalTab";
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
        <div className= "features">
          <span
            className={viewTab === "journal" ? "nav-link active" : "nav-link"}
            onClick={() => displayTab("journal")}
          >
            Journal
          </span>

          <span
            className={viewTab === "reminder" ? "nav-link active" : "nav-link"}
            onClick={() => displayTab("reminder")}
          >
            Reminders
          </span>

          <span
            className={viewTab === "game" ? "nav-link active" : "nav-link"}
            onClick={() => displayTab("game")}
          >
            Memory Game
          </span>
        </div>
        <div>
          <span className="logout-button"><LogoutButton setAuthInfo={setAuthInfo} /></span>
        </div>
        
      </div>
    );
  };

  // If a tab is clicked, displays that tab
  const renderTab = () => (
    <div className="tabs">
      {viewTab === "journal" && ( <div className="journaltab">
          <JournalTab/>
        </div>)}
        
        {viewTab === "reminder" && (<div className="remindertab">
          <ReminderTab />
        </div>
      )}
      {viewTab === "game" && <Gametab />}
    </div>
  );

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
