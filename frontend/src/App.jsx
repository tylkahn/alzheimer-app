import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

const BASE_URL = 'http://localhost:8000';

// const todoItems = [
//   {
//     id: 1,
//     title: "Go to Market",
//     description: "Buy ingredients to prepare dinner",
//     completed: true,
//   },
//   {
//     id: 2,
//     title: "Study",
//     description: "Read Algebra and History textbook for the upcoming test",
//     completed: false,
//   },
//   {
//     id: 3,
//     title: "Sammy's books",
//     description: "Go to library to return Sammy's books",
//     completed: true,
//   },
//   {
//     id: 4,
//     title: "Article",
//     description: "Write article on how to use Django with React",
//     completed: false,
//   },
// ];

function App() {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [modal, setModal] = useState(false);
  const [activeItem, setActiveItem] = useState({
    title: '',
    description: '',
    completed: false,
  });

  const refreshList = () => {
    axios
      .get(BASE_URL + '/api/todos')
      .then((res) => {
        console.log(res);
        setTodoList(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    refreshList();
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (item) => {
    toggle();
    console.log(item);

    // NOTE: let it be known that I very much dislike using axios.put and axios.delete
    if (item.id) {
      axios
        .put(BASE_URL + `/api/todos/${item.id}/`, item)
        .then(() => refreshList());
    } else {
      axios.post(BASE_URL + '/api/todos/', item).then(() => refreshList());
    }
  };

  const deleteItem = (item) => {
    axios.delete(BASE_URL + `/api/todos/${item.id}/`).then(() => refreshList());
  };

  const createItem = () => {
    const item = { title: '', description: '', completed: false };
    setActiveItem(item);
    toggle();
  };

  const editItem = (item) => {
    setActiveItem(item);
    console.log(item);
    toggle();
  };

  const displayCompleted = (status) => {
    if (status) {
      setViewCompleted(true);
    } else {
      setViewCompleted(false);
    }
  };

  const renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={viewCompleted ? 'nav-link active' : 'nav-link'}
          onClick={() => displayCompleted(true)}
        >
          Complete
        </span>
        <span
          className={viewCompleted ? 'nav-link' : 'nav-link active'}
          onClick={() => displayCompleted(false)}
        >
          Incomplete
        </span>
      </div>
    );
  };

  const renderItems = () => {
    const newItems = todoList.filter((item) => item.completed == viewCompleted);

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${viewCompleted ? 'completed-todo' : ''}`}
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
      <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
              <button className="btn btn-primary" onClick={createItem}>
                Add task
              </button>
            </div>
            {renderTabList()}
            <ul className="list-group list-group-flush border-top-0">
              {renderItems()}
            </ul>
          </div>
        </div>
      </div>
      {modal ? (
        <Modal activeItem={activeItem} toggle={toggle} onSave={handleSubmit} />
      ) : null}
    </main>
  );

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
