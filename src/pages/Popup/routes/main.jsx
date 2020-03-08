import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Loader from './loader.jsx';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

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

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sitename: '',
      isLoaded: false,
      data: []
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
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/index/azure?sitename=' + result
      })
      .catch(function (error) {
      // handle error
        alert(error);
      })
      .then(function (res) {
        console.log(res);
        let data = res.data;
        this.setState({
              sitename: result,
              isLoaded: true,
              data: data
            });
      }.bind(this));
    }.bind(this))
  }
  render() {
  const { sitename, isLoaded, data } = this.state;

  let listItems = data.map((datapt) =>
    <div className = "outerBox">
    <div className ="box">
      {datapt.mainText} <a href={datapt.source} target="_blank">Source</a>
    </div>
    </div>
  );

  if(listItems.length == 0) {
    listItems =
      <div className = "outerBox">
        <div className ="box">
          Check back soon for information about this site's emissions!
        </div>
    </div>
  }

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
