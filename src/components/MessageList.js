import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
    this.msgRef = this.props.firebase.database().ref('Messages');
  }

  componentDidMount() {
    this.msgRef.on('child_added', snapshot => {
      //console.log(snapshot);
      const msg = snapshot.val();
      msg.key = snapshot.key;
      this.setState({messages: this.state.messages.concat(msg)});
    });
  }

  render() {
    return (
      <section className="messages">
        <p>
          Current Room:
          {this.props.activeRoomID}
        </p>
        {this.state.messages
          .filter(message => message.roomID === this.props.activeRoomID)
          .map(message => (
            <div className="message-group" key={message.key}>
              <div>{message.username}</div>
              <div>{message.content}</div>
              <div>{message.sentAt}</div>
            </div>
          ))}
      </section>
    );
  }
}

export default MessageList;
