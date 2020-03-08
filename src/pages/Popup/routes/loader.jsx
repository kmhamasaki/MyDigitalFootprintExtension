import React, { Component } from 'react';
import { Spin, Icon } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const LoaderContainer = styled.div`
  height: 200px;
  text-align: center;
`;
class Loader extends Component {
  render() {
    return (
      <LoaderContainer style={this.props.style || {}}>
        <Spin size="large" />
        {/* <Icon type="loading" /> */}
      </LoaderContainer>
    );
  }
}

export default withRouter(Loader);