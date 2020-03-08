import React from 'react';
import {Pie, Doughnut, Bar} from 'react-chartjs-2';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 10px;
  .divider {
    padding: 20px;
  }
`;

const state = {
  labels: ['Facebook', 'YouTube', 'GitHub',
           'Gmail', 'Twitter'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: [
        '#B21F00',
        '#C9DE00',
        '#2FDE00',
        '#00A6B4',
        '#6800B4'
      ],
      hoverBackgroundColor: [
      '#501800',
      '#4B5000',
      '#175000',
      '#003350',
      '#35014F'
      ],
      data: [100, 80, 20, 40, 30]
    }
  ]
}

const state2 = {
  labels: ['3/1', '3/2', '3/3',
           '3/4', '3/5', '3/6', '3/7'],
  datasets: [
    {
      label: 'Emissions',
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)"
      ],
      "borderColor": [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)"
      ],
      borderWidth: 2,
      data: [65, 59, 43, 81, 56, 31, 67]
    }
  ]
}

class Charts extends React.Component {
  render() {
    return (
      <Container>
        <Pie
          data={state}
          options={{
            title:{
              display:true,
              text:'Emissions by Website',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
        <div className="divider"/>
        <Bar
          data={state2}
          options={{
            title:{
              display:true,
              text:'Weekly Emissions',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            },
            scales: {
              yAxes: [{
                ticks:{
                  beginAtZero: true
                }
              }]
            }
          }}
        />
      </Container>
    );
  }
}


export default withRouter(Charts);