import React from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './RoomList';

var config = {
  apiKey: 'AIzaSyDQ5PE85DJaHxVUQ8XQX4GCgzOyXQFdX6A',
  authDomain: 'bloc-chat-1027.firebaseapp.com',
  databaseURL: 'https://bloc-chat-1027.firebaseio.com',
  projectId: 'bloc-chat-1027',
  storageBucket: 'bloc-chat-1027.appspot.com',
  messagingSenderId: '905729331918',
};
firebase.initializeApp(config);

const App = () => (
  <main className="wrapper">
    <header className="app-title">
      <h1>Bloc Chat</h1>
    </header>
    <section className="rows">
      <section className="room-list">
        <RoomList firebase={firebase} />
      </section>
      <section className="message-list">
        <p>Placeholder for Message List</p>
      </section>
    </section>
  </main>
);

export default App;
