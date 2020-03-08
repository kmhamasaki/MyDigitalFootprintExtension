import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Loader from './loader.jsx';
import { withRouter } from 'react-router-dom';

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
  .pieChart {
    width: 50%;
    align-items: center;
    justify-content: center;
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

// azureuser athena2020!

class Main extends React.Component {
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
    "There are about 5 grams of CO2 emissions per Google search.",
    "Google processes an approximate average of 47,000 requests every second, which represents an estimated amount of 500 kg of CO2 emissions per second.",
    "Google accounts for 40% of the internet's CO2 emissions. All internet activity total accounts for the same amount of pollution as the global aviation industry.",
  ];
  const listItems = data.map((text) =>
    <div className = "outerBox">
    <div className ="box">
      {text} <a href="https://qz.com/1267709/every-google-search-results-in-co2-emissions-this-real-time-dataviz-shows-how-much/" target="_blank">Source</a>
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
          <div className = "siteName">
            <h3>Current Site Name: {sitename} </h3>
          </div>
        </div>
        <div className="container">         
          {listItems}
        </div>
      </div>
      </Container>
    );
  }
}

export default withRouter(Main);
