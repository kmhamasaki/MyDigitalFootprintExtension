import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Loader from './loader.jsx';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';
import logo from './../../../assets/img/logo-watson.png';
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';

const Container = styled.div`
  .outer  {
    height: 407px;
  }
  .rsc {
    height:100%;
  }
`;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

class DBPedia extends React.Component {
constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };

    this.triggetNext = this.triggetNext.bind(this);
  }

  componentWillMount() {
    const self = this;
    const { steps } = this.props;
    const search = steps.search.value;

    const queryUrl = 'http://localhost:3000/api/index/question?messageType=text&text=' + search;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', readyStateChange);

    function readyStateChange() {
      if (this.readyState === 4) {
        console.log(this.responseText);
        //const data = JSON.parse(this.responseText);
        //const bindings = data.results.bindings;
        if (this.responseText) {
          self.setState({ loading: false, result: this.responseText });
        } else {
          self.setState({ loading: false, result: 'Not found.' });
        }
      }
    }

    xhr.open('GET', queryUrl);
    xhr.send();
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  render() {
    const { trigger, loading, result } = this.state;

    return (
      <div className="dbpedia">
        { loading ? <Loading /> : result }
        {
          !loading &&
          <div
            style={{
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            {
              !trigger &&
              <button
                onClick={() => this.triggetNext()}
              >
                Search Again
              </button>
            }
          </div>
        }
      </div>
    );
  }
}

DBPedia.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

DBPedia.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

const Watson = () => (
  <Container>
  <div className="outer">
  <ChatBot
    steps={[
      {
        id: '1',
        message: 'Type something',
        trigger: 'search',
      },
      {
        id: 'search',
        user: true,
        trigger: '3',
      },
      {
        id: '3',
        component: <DBPedia />,
        waitAction: true,
        trigger: '1',
      },
    ]}
  />
  </div>
  </Container>
);

export default withRouter(Watson);

