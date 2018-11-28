import React, {Component} from 'react';
import './MessageList.css';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessage: ''
    };
    this.msgRef = this.props.firebase.database().ref('Messages');
    this.createMessage = this.createMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.msgRef.on('child_added', snapshot => {
      const msg = snapshot.val();
      msg.key = snapshot.key;
      this.setState({messages: this.state.messages.concat(msg)});
    });
  }

  createMessage(event) {
    event.preventDefault();
    this.msgRef.push({
      content: this.state.newMessage,
      username: this.props.user ? this.props.user.displayName : 'Guest',
      roomID: this.props.activeRoomId,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
    });
    this.setState({newMessage: ''});
  }

  handleChange(event) {
    this.setState({newMessage: event.target.value});
  }

  render() {
    return (
      <section className="messages">
        {this.state.messages
          .filter(messages => messages.roomId === this.props.activeRoomId)
          .map(messages => (
            <div className="message-group" key={messages.key}>
              <div>{messages.username}</div>
              <div>{messages.content}</div>
              <div>{messages.sentAt}</div>
              <div>{messages.roomID}</div>
            </div>
          ))}
        <form className="add-message" onSubmit={event => this.createMessage(event)}>
          <input
            type="text"
            placeholder="Write Your Message Here"
            value={this.state.newMessage}
            onChange={event => this.handleChange(event)}
          />
          <input type="submit" value="Send" />
        </form>
      </section>
    );
  }
}

export default MessageList;
