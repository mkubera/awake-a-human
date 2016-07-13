'use strict';

import React from 'react';
import {last as _last} from 'lodash'; //_.last
import init from './state/init.js'
import Fn from './utils/fn.js'
import Portion from './Portion.js'
import Instructions from './Instructions.js'

class GameScreen extends React.Component {
  constructor(props) {
    super(props);

    // this.state = init.fake_state
    this.state = {...init.initial_state}
    
    this.startGame = this.startGame.bind(this)
    this.switchRollable = this.switchRollable.bind(this)
    this.rollAgain = this.rollAgain.bind(this)
    this.finishTurn = this.finishTurn.bind(this)

    // <Portion /> props
    this.moveHero = this.moveHero.bind(this)
    this.addHp = this.addHp.bind(this)
    this.removeDoubts = this.removeDoubts.bind(this)
    this.feed = this.feed.bind(this)
  }

   /* BUTTONS */
  startGame() {
    const new_state = {...this.state}
    // const new_state = {...init.initial_state}

    const new_state1 = Fn.decrRollsLeft(new_state)
    const new_state2 = Fn.rollSixDice(new_state1)
    const new_state3 = Fn.updatePortionsFromRollResults(new_state2)
    const new_state4 = Fn.startNewGame(new_state3)

    this.setState(new_state3)
  }
  
  switchRollable(e) {
    const new_roll = [...this.state.roll]
    const die_id = Number(e.target.id.slice(3,4)) - 1 //"Num" from rollarea-die id attr === "DieNum"
    
    new_roll[die_id].rollable = !new_roll[die_id].rollable
    
    this.setState({ roll: [...new_roll] });
  }

  rollAgain() {
    const new_state = {...this.state}

    const new_state1 = Fn.rollRollableDice(new_state)
    const new_state2 = Fn.decrRollsLeft(new_state1)
    const new_state3 = Fn.updatePortionsFromRollResults(new_state2)

    this.setState(new_state3)
  }

  finishTurn() {
    const new_state = {...this.state}

    const new_state1 = Fn.incrTurnCount(new_state)
    const new_state2 = Fn.setRollsLeft(new_state1, 3)
    const new_state3 = Fn.decrRollsLeft(new_state2)
    const new_state4 = Fn.rollSixDice(new_state3)
    const new_state5 = Fn.updatePortionsFromRollResults(new_state4)
    const new_state6 = Fn.resetDidThisTurn(new_state5)
    const new_state7 = Fn.setAllDiceToRollable(new_state6)
    const new_state8 = Fn.makeAllDiceUsable(new_state7)
    const new_state9 = Fn.removeEachPortionsHpEqualToNumberOfDoubts(new_state8)
    const new_state10 = Fn.spawnDoubtsRandomly(new_state9, 1)

    this.setState(new_state10, () => {
      const randomHp = () => _.random(5,10)
      
      const reset_state = {
        game_started: false,
        portions: [
          {name: "Mind", id: 1, hp: randomHp(), doubts_no: 1, is_hero_present: true, feed_level: 0, moveable: false, hpable: false, doubtable: false, feedable: false},
          {name: "Heart", id: 2, hp: randomHp(), doubts_no: 1, is_hero_present: false, feed_level: 0, moveable: false, hpable: false, doubtable: false, feedable: false},
          {name: "Spirit", id: 3, hp: randomHp(), doubts_no: 1, is_hero_present: false, feed_level: 0, moveable: false, hpable: false, doubtable: false, feedable: false},
          {name: "Body", id: 4, hp: randomHp(), doubts_no: 1, is_hero_present: false, feed_level: 0, moveable: false, hpable: false, doubtable: false, feedable: false}
        ],
        roll: [
          {id: 1, side: 0, rollable: true, usable: true}, {id: 2, side: 0, rollable: true, usable: true}, 
          {id: 3, side: 0, rollable: true, usable: true}, {id: 4, side: 0, rollable: true, usable: true}, 
          {id: 5, side: 0, rollable: true, usable: true}, {id: 6, side: 0, rollable: true, usable: true}
        ],
        rolls_left: 3,
        did_this_turn: {moved: false, added_hp: false, removed_doubts: false, fed: false},
        turn: 1,
        stats: {}
      }
      
      const new_state = {...this.state}
      
      if (Fn.checkForWin(new_state)) {
        alert("Hurray!! You managed to Awake a Human Being !!!")
        this.setState(reset_state)
        return;
      }
      
      if (Fn.checkForLoss(new_state)) {
        alert("Doubts have conquered the Human you were trying to awake...")
        this.setState(reset_state);
        return;
      }
      return;
    })
  }

  /* ACTIONS ( <Portion /> ) */
  moveHero(e) {
    const target_portion = e.target.id
    const target_portion_index = Number(_last(target_portion.split(""))) - 1
    
    let new_state = {...this.state}

    // reset hero, reset moveable in Every Portion
    new_state.portions.map((portion) => {
      portion.is_hero_present = false
      portion.moveable = false
    })

    // move hero to the Chosen Portion
    new_state.portions[target_portion_index].is_hero_present = true
    
    const new_state1 = Fn.setRollsLeft(new_state, 0)
    const new_state2 = Fn.makeDiceUnusable(new_state1, {side: 1})
    const new_state3 = Fn.didThisTurn(new_state2, "moved")

    this.setState(new_state3);
  }
  
  addHp(e) {
    const target_portion = e.target.id
    const target_portion_index = Number(_last(target_portion.split(""))) - 1
    
    const hp_amount = Fn.calcHpAmount(this.state)
    
    let new_state = {...this.state}
    
    new_state.portions[target_portion_index].hp += hp_amount
    
    const new_state1 = Fn.setRollsLeft(new_state, 0)
    const new_state2 = Fn.makeDiceUnusable(new_state1, {side: 2})
    const new_state3 = Fn.didThisTurn(new_state2, "added_hp")

    this.setState(new_state3)
  }
  
  removeDoubts(e) {
    const target_portion = e.target.id
    const target_portion_index = Number(_last(target_portion.split(""))) - 1
    
    const doubts_amount = Fn.calcDoubtsAmount(this.state)
    
    let new_state = {...this.state}
    
    new_state.portions[target_portion_index].doubts_no -= doubts_amount
    
    const new_state1 = Fn.setRollsLeft(new_state, 0)
    const new_state2 = Fn.makeDiceUnusable(new_state1, {side: 3})
    const new_state3 = Fn.didThisTurn(new_state2, "removed_doubts")
    
    this.setState(new_state3);
  }
  
  feed(e) {
    const target_id = e.target.id
    const target_portion = Number(_last(target_id.split("")))
    
    let new_state = {...this.state}
    
    new_state.portions.map((portion) => {
      if (portion.id === target_portion) {
        portion.feed_level += 1
      }
      return portion;
    })
    
    const new_state1 = Fn.setRollsLeft(new_state, 0)
    const new_state2 = Fn.makeDiceUnusable(new_state1, {side: 4})
    const new_state3 = Fn.didThisTurn(new_state2, "fed")
    
    this.setState(new_state3)
  }

  render() {
    const rollable_className = (die) => {
      let className = "rollarea-die";
      
      // is a die rollable and/or usable ?
      if (die.rollable) {
        if (die.usable) className += " rollarea-die--rollable"
        else className += " rollarea-die--unusable rollarea-die--rollable"
      } else {
        className += die.usable ? "" : " rollarea-die--unusable rollarea-die--rollable";
      }

      // match die's side with a class
      switch (die.side) {
        case 1:
          className += " dieMove"; break;
        case 2:
          className += " dieHp"; break;
        case 3:
          className += " dieDoubt"; break;
        case 4:
          className += " dieFeed"; break;
      }
      return className
    }
    
    const rollable_dieSide = (side) => {
      let output;
      switch (side) {
        case 1:
          output = "MOVE"; break;
        case 2:
          output = "HP"; break;
        case 3:
          output = "DOUBT"; break;
        case 4:
          output= "FEED"; break;
      }
      return output
    }
    
    const ZeroRollsLeft = this.state.rolls_left === 0
    
    return (
      <div className="gamescreen">
        <div className="game-wrap">
          <div className="game">
          
            {/* START GAME */}
            <div className={this.state.game_started ? "startGame hidden" : "startGame"} onClick={this.startGame}>
              <div>START GAME</div>
            </div>

            <div className="top">
              
              {/* TURN COUNTER */}
              <div>
                turn counter: <span className="turncounter">{this.state.turn}</span>
              </div>
            </div>

            {/* PORTIONS */}
            <div className="portions-wrap">
              <div className="portions">
                { this.state.portions.map((portion) => {
                  return <div key={portion.id}><Portion {...portion} 
                            did_this_turn={this.state.did_this_turn}
                            moveHero={this.moveHero} 
                            addHp={this.addHp}
                            removeDoubts={this.removeDoubts}
                            feed={this.feed} /></div>
                })}
              </div>
            </div>

            {/* ROLLS LEFT */}
            <div className="rollsleft">
              <div>
                rolls left: <span className="rollarea-rollsleft">{this.state.rolls_left}</span>
              </div>
            </div>
            
            {/* ROLLAREA */}
            <div className="rollarea">
              <div className="rollarea-dice">
                {this.state.roll.map((die) => {
                  return <div key={die.id}
                              id={`Die${die.id}`}
                              className={rollable_className(die)}
                              onClick={die.usable ? this.switchRollable : null}>{rollable_dieSide(die.side)}</div>
                })}
              </div>

              
              <div className="rollarea-btns">
                <div 
                  className={ZeroRollsLeft ? "rollarea-rollAgain inactive" : "rollarea-rollAgain"} 
                  onClick={ZeroRollsLeft ? null : this.rollAgain}>
                    <div className="rollarea-rollAgain-inner">ROLL AGAIN</div>
                </div>
                <div 
                  className="rollarea-finishTurn" 
                  onClick={this.finishTurn}>
                    <div className="rollarea-finishTurn-inner">END TURN</div>
                </div>
              </div>
                
            </div>
          </div>
        </div>
        
        <hr/>
        <br/>
        
        <Instructions />

        {/* Feed:
              the Mind (liberation, truth),
              the Heart (loneliness, love),
              the Spirit (imagination, third eye),
              the Body (dance, sexuality) */}

      </div>
    );
  }

}

export default GameScreen;
