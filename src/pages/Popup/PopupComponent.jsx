import React, { Component } from 'react';
import Greetings from '../../containers/Greetings/Greetings';
import Main from './routes/main.jsx'
import './Popup.css';
import styled from 'styled-components';
import { Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';
import { Link, Router, Redirect, withRouter } from 'react-router-dom';

const Container = styled.div`
  width: 360px;
  height: 100%;

  .menuContainer {
    border-top: 1px solid #eeeeee;
    position: absolute;
    width: 100%;
    bottom: 0px;
    text-align:center;
  }
  .header {
    height: 60px;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ant-menu-item {
    width: 25%;
  }
`;

class PopupComponent extends Component {

  state = {
    current: '/',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Container>
        <div className="header">
          <div className="title">My Digital Footprint</div>
        </div>
        {this.props.children}
        <div className="menuContainer">
            <Menu mode="horizontal" onClick={this.handleClick} selectedKeys={[this.state.current]}>
              <Menu.Item key='/'>
                <Link to='/'>
                  <FontAwesomeIcon icon="home" />
                </Link>
              </Menu.Item>
              <Menu.Item key='/charts'>
                <Link to='/charts'>
                  <FontAwesomeIcon icon="chart-line" />
                </Link>
              </Menu.Item>
              <Menu.Item key='/profile'>
                <Link to='/profile'>
                  <FontAwesomeIcon icon="user" />
                </Link>
              </Menu.Item>
              <Menu.Item key='/watson'>
                <Link to='/watson'>
                  <FontAwesomeIcon icon="user" />
                </Link>
              </Menu.Item>
            </Menu>
          </div>
      </Container>
    );
  }
}

export default withRouter(PopupComponent);
