'use strict';

const calcHpAmount = (state) => {
  const hp_dice_count = state.roll.map((die) => die.side).filter((die) => die === 2).length
  
  let hp_to_add = 0;
  
  switch (hp_dice_count) {
    case 2: hp_to_add = 1; break;
    case 3: hp_to_add = 2; break;
    case 4: hp_to_add = 3; break;
    case 5: hp_to_add = 4; break;
    case 6: hp_to_add = 5; break;
  }
  
  return hp_to_add
}

const calcDoubtsAmount = (state) => {
  const doubt_dice_count = state.roll.map((die) => die.side).filter((die) => die === 3).length
  
  let doubts_to_remove = 0;
  
  switch (doubt_dice_count) {
    case 2: doubts_to_remove = 1; break;
    case 3: doubts_to_remove = 1; break;
    case 4: doubts_to_remove = 2; break;
    case 5: doubts_to_remove = 2; break;
    case 6: doubts_to_remove = 3; break;
  }
  
  return doubts_to_remove
}

export default {
  calcHpAmount
  , calcDoubtsAmount
}
