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
        {this.state.messages.map(msg => (
          <p key={msg.key}>{msg.content}</p>
        ))}
      </section>
    );
  }
}

export default MessageList;
