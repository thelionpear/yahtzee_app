import React from 'react'
import { Grid } from 'semantic-ui-react'
import styled from 'styled-components'
import Board from './Board'
import ScoreCard from './ScoreCard'

const FullHeight = styled(Grid.Column)`
  height: 100vh;
`
const BoardColumn = FullHeight.extend`
  background-color: #AAFFAA;
`

const ScoreColumn = FullHeight.extend`
  background-color: #9370DB;
`

class Game extends React.Component {
  state = {
    roll: 0, 
    dice: [...new Array(5)], 
    keep: [], 
  }

  rollDice = () => {
    const { keep } = this.state 

    let dice = this.state.dice.map( (el, i) => {
      if (keep.includes(i))
        return el 
      return Math.floor(Math.random() * 6) + 1
    })

    this.setState( state => {
      return { dice, roll: state.roll + 1 }
    })
  }

  toggleKept = (i) => {
    const { keep } = this.state 
    let updatedKeep 

    if (keep.includes(i)) 
      updatedKeep = keep.filter( k => k !== i ) 
    else 
      updatedKeep = [...keep, i] 
    
    this.setState({ keep: updatedKeep }) 
  }

  render() {
    const { roll, dice, keep } = this.state 

    return (
      <Grid>
        <Grid.Row>
          <BoardColumn width={10}>
            <Board 
              dice={dice}
              roll={roll} 
              rollDice={this.rollDice} 
              toggleKept={this.toggleKept} 
              keep={keep} 
            />
          </BoardColumn>
          <ScoreColumn width={6}>
            <ScoreCard />
          </ScoreColumn>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Game