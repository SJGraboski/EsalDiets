import React from "React";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from "victory";

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: [{x:1, y:1}],
      energy: [{x:1, y:1}],
      weigh: [{x:1, y:1}]
    }
  };

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    return this.setState({
      mood: nextProps.mood,
      energy: nextProps.energy,
      weight: nextProps.weight
    })
  };

  render () {
    return (
      <svg width="1200" height="300">

        <VictoryChart>

          <VictoryLabel
            x={150}
            y={150}>
            Mood and Energy
          </VictoryLabel>

          <VictoryAxis

            domain={[1,28]}
            label="Day"
            style={{
              axis: {stroke: "black"},
              grid: {strokeWidth: 2},
              ticks: {stroke: "red"},
              tickLabels: {fontSize: 12},
              axisLabel: {fontsize: 16}
            }}
          />

          <VictoryAxis
            dependentAxis
            domain={[1,5]}
            label="Rating"
          />


          <VictoryLine
            style={{data:
              {stroke: "red", strokeWidth: 6}
            }}
            data={this.state.mood}
          />

          <VictoryLine
            style={{data:
              {stroke: "blue", strokeWidth: 6}
            }}

            data={this.state.energy}

          />

          {/*<VictoryLine
            style={{data:
              {stroke: "green", strokeWidth: 6}
            }}

            data={this.state.weight > [{x:28,y:0}, {x:28,y:0}] }

          />*/}
        </VictoryChart>
      </svg>


    );
  }
}

module.exports = Graph;