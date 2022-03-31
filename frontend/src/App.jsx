import React, { useState, useEffect } from 'react';
import Modal from "./components/Modal";
import axios from "axios";
import JournalTab from "./components/journal/JournalTab";
import './App.css';
import {nanoid} from 'nanoid';

// TODO: DELETE THIS LINE

function App() {
  const [viewCompleted, setViewCompleted] = useState(false);

  const displayCompleted = (status) => {
    if (status) {
      setViewCompleted(true);
    } else {
      setViewCompleted(false);
    }
  }

  const renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={viewCompleted ? 'nav-link active' : 'nav-link'}
          onClick={() => displayCompleted(true)}
        >
          Journal
        </span>
        <span
          className={viewCompleted ? 'nav-link' : 'nav-link active'}
          onClick={() => displayCompleted(false)}
        >
          Game
        </span>
      </div>
    );
  };

  const renderTab = () => {
    return (//entryList will start empty and become filled through addEntry button presses as the end goal
      <div className="journaltab">
        {viewCompleted && <JournalTab entries={[]} />}
      </div>
    )
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
