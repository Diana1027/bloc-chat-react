import React, {Component} from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

var config = {
  apiKey: 'AIzaSyDQ5PE85DJaHxVUQ8XQX4GCgzOyXQFdX6A',
  authDomain: 'bloc-chat-1027.firebaseapp.com',
  databaseURL: 'https://bloc-chat-1027.firebaseio.com',
  projectId: 'bloc-chat-1027',
  storageBucket: 'bloc-chat-1027.appspot.com',
  messagingSenderId: '905729331918',
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: '',
      activeRoomID: ''
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
  }

  setActiveRoom(room) {
    this.setState({
      activeRoom: room.name,
      activeRoomID: room.key,
    });
    console.log(room);
  }

  render() {
    return (
      <main className="wrapper">
        <header className="app-title">
          <h1>Bloc Chat</h1>
          <h2>Current Room: {this.state.activeRoom}</h2>
        </header>
        <section className="rows">
          <section className="room-list">
            <RoomList firebase={firebase} setActiveRoom={this.setActiveRoom} />
          </section>
          <section className="message-list">
            <MessageList
              firebase={firebase}
              activeRoomID={this.state.activeRoomID}
              activeRoom={this.state.activeRoom}
            />
          </section>
        </section>
      </main>
    );
  }
}

export default App;
