'use strict';
import _ from 'lodash';

// increase Turn Count
const incrTurnCount = (new_state) => {
  new_state.turn += 1
  return new_state
}

// set Rolls Left
const setRollsLeft = (new_state, int) => {
  new_state.rolls_left = int
  return new_state
}

// decrease Rolls Left
const decrRollsLeft = (new_state) => {
  if (new_state.rolls_left <= 0)
    return alert("No more rolls left in this turn.")
  else {
    new_state.rolls_left -= 1
    return new_state
  }
}

// Roll six dice
const rollSixDice = (new_state) => {
  new_state.roll.map((die) => {
    die.side = _.random(1, 4)
    return die
  })
  return new_state
}

const rollRollableDice = (new_state) => {
  new_state.roll.map((die) => {
    if (die.rollable)
      die.side = _.random(1, 4)
    return die
  })
  return new_state
}

const setAllDiceToRollable = (new_state) => {
  new_state.roll.map((die) => die.rollable = true)
  return new_state
}

// update Portions according to the current Roll
const updatePortionsFromRollResults = (new_state) => {
  const rolls = new_state.roll.map((die) => die.side)
  const ones = rolls.filter((die) => die === 1)
  const twos = rolls.filter((die) => die === 2)
  const threes = rolls.filter((die) => die === 3)
  const fours = rolls.filter((die) => die === 4)
  const is_moveable = ones.length >= 2
  const is_hpable = twos.length >= 2
  const is_doubtable = threes.length >= 2
  const is_feedable = fours.length >= 2

  new_state.portions.map((portion) => {
    portion.moveable = is_moveable
    portion.hpable = is_hpable
    portion.doubtable = is_doubtable
    portion.feedable = is_feedable
    return portion
  })
  
  return new_state
}

// After an action (e.g. Move, AddHp)
// The used dice should no longer be usable until the start of next turn
const makeDiceUnusable = (new_state, {side}) => {
  new_state.roll.map((die) => { 
    if (die.side === side)
      die.usable = false
  })
  return new_state
}

const makeAllDiceUsable = (new_state) => {
  new_state.roll.map((die) => die.usable = true)
  return new_state
}

// action (e.g. "moved", "added_hp")
const didThisTurn = (new_state, action) => {
  new_state.did_this_turn[action] = true
  return new_state
}

// reset all actions
const resetDidThisTurn = (new_state) => {
  new_state.did_this_turn.moved = false
  new_state.did_this_turn.added_hp = false
  new_state.did_this_turn.removed_doubts = false
  new_state.did_this_turn.fed = false
  return new_state
}

// Spawn new Doubts in a random Portion
const spawnDoubtsRandomly = (new_state, add_doubts_no) => {
  const random_portion = _.random(0,3)
  
  new_state.portions[random_portion].doubts_no += add_doubts_no
  
  return new_state
}

// decrease Hp by the Doubts number in the Portion
const removeEachPortionsHpEqualToNumberOfDoubts = (new_state) => {
  new_state.portions.map((portion) => portion.hp -= portion.doubts_no)
  return new_state
}

// start new game
const startNewGame = (new_state) => {
  new_state.game_started = true
  return new_state
}

export default
{ incrTurnCount
, setRollsLeft
, decrRollsLeft
, rollSixDice
, rollRollableDice
, setAllDiceToRollable
, updatePortionsFromRollResults
, makeDiceUnusable
, makeAllDiceUsable
, didThisTurn
, resetDidThisTurn
, spawnDoubtsRandomly
, removeEachPortionsHpEqualToNumberOfDoubts
, startNewGame
}
