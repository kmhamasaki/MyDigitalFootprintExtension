import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Loader from './loader.jsx';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  margin-bottom: 10px;
  .outer {
    margin: 10px 10px 0 10px;
  }
  .container {
    align-items: center;
    justify-content: center;
    display: block;
  }
  .pieChart {
    width: 50%;
    align-items: center;
    justify-content: center;
  }
  .box {
    border-radius: 12px;
    width: 90%;
    padding: 16px;
    background-color: #7cdcde;
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
  .top {
    display: block;
    align-items: center;
    justify-content: center;
  }
  .iconStyle {
    float: left;
    padding-right: 3px;
    margin-right: 10px;
  }
  .center {
    text-align:center;
    margin-left: auto;
    margin-right: auto;
  }
`;

// azureuser athena2020!

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sitename: 'sdfas',
      isLoaded: false,
    };
  }

  componentDidMount() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    var url = tabs[0].url;
    //alert(url);
    var result = 'sad';
    var match = '';
    if (
      (match = url.match(
        /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im,
      ))
    ) {
      result = match[1];
      if ((match = result.match(/^[^\.]+\.(.+\..+)$/))) {
        result = match[1];
      }
    }
    this.setState({
      isLoaded: true,
      sitename: result,
    });
    }.bind(this));
  }
  render() {
    const { sitename, isLoaded } = this.state;
    const data = [
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. L",
    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to",
    "but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letras"
  ];
  const listItems = data.map((text) =>
    <div className = "outerBox">
    <div className ="box">
      {text}
    </div>
    </div>
  );

    if (!isLoaded) {
      <Loader style={{ marginTop: '5%' }} />;
    }
    return (
      <Container>
      <div className="outer">
        <div className="container">
          <div className ="center">
            <FontAwesomeIcon icon="user-circle" size="5x"/>
            </div>
            <div className ="center">
            <h3>Kristyn H </h3>
            </div>
            <div className ="center">
            <h3>Your total CO2 emissions: 444kg</h3>
            </div>
        </div>
        <div className="container">         
        <div className = "outerBox">
          <div className ="box">
            <div className = "iconStyle">
            <FontAwesomeIcon icon="plane" size="3x"/>
            </div>
              You have used the equivalent of 3.3 hours of flight time.
            </div>
          </div>
          <div className = "outerBox">
            <div className ="box">
              <div className = "iconStyle">
              <FontAwesomeIcon icon="burn" size="3x"/>
              </div>
                You have used the equivalent of burning 490 pounds of coal.
              </div>
            </div>
          </div>
          <div className = "outerBox">
            <div className ="box">
              <div className = "iconStyle">
              <FontAwesomeIcon icon="tree" size="3x"/>
              </div>
                You have used the equivalent of planting 7.3 trees.
              </div>
            </div>
          </div>
      </Container>
    );
  }
}

export default withRouter(Profile);
