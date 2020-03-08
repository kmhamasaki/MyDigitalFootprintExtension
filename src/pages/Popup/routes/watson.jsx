import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Loader from './loader.jsx';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';
import logo from './../../../assets/img/logo-watson.png';

const Container = styled.div`
  margin-bottom: 10px;
  overflow-y:scroll;
  position: relative;
  .outer {
    margin: 10px 10px 0 10px;
  }
  .container {
    align-items: center;
    justify-content: center;
    display: block;
  }
  .siteName {
    text-align: center
  }
  .box {
    border-radius: 12px;
    width: 90%;
    padding: 16px;
    background-color: #e9f090;
    margin-left: auto;
    margin-right: auto;
  }
  .outerBox {
    align-items: center;
    justify-content: center;
    width:100%;
    padding-top:10px;
    margin-left: auto;
    margin-right: auto;
  }
`;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

class Watson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sitename: '',
      isLoaded: false,
      data: []
    };
  }

  componentDidMount() {
    addResponseMessage("Hello. I am here to educate you about your digital footprint! " +
      "Please ask me any questions you may have about data, data storage, environmental consequences, " +
      "or how you can improve.");
  }
  handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  }
  render() {
    return (
      <Container>
      <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar={logo}
          title="My new awesome title"
          subtitle="And my cool subtitle"
        />
      </Container>
    );
  }
}

export default withRouter(Watson);
