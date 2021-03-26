import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Form from './Form';
import User from './User';

const initialUsers = []


export default function App() {
  const [users, setUsers] = useState(initialUsers)

  return (
    <div className="App">
      <header><h1>User App</h1></header>
      <Form />
      {
        users.map(user => {
          return (
            <User key={user.name} details={user} />
          )
        })


      }


    </div>
  );
}
