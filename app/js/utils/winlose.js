'use strict';
import initial_state from '../state/init.js'

const checkForWin = (new_state) => {
  const portions_with_winning_feed_level = new_state.portions.filter((portion) => portion.feed_level >= 5)
  if (portions_with_winning_feed_level.length === 4) {
    return true
  }
  return false
}

const checkForLoss = (new_state) => {
  const portions_with_hp_lower_than_zero = new_state.portions.filter((portion) => portion.hp <= 0)
  if (portions_with_hp_lower_than_zero.length > 0) {
    return true
  }
  return false
}

export default 
{ checkForWin
, checkForLoss
}
