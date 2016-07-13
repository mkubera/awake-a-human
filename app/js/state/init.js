'use strict'
import _ from 'lodash'

const randomHp = () => _.random(5,10)

const initial_state = {
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

const fake_state = {
  game_started: false,
  portions: [
    {id: 1, hp: 0, doubts_no: 1, is_hero_present: true, feed_level: 0, moveable: false, hpable: false, doubtable: false, feedable: false},
    {id: 2, hp: 0, doubts_no: 1, is_hero_present: false, feed_level: 0, moveable: false, hpable: false, doubtable: false, feedable: false},
    {id: 3, hp: 0, doubts_no: 1, is_hero_present: false, feed_level: 0, moveable: false, hpable: false, doubtable: false, feedable: false},
    {id: 4, hp: 0, doubts_no: 1, is_hero_present: false, feed_level: 0, moveable: false, hpable: false, doubtable: false, feedable: false}
  ],
  roll: [
    {id: 1, side: 2, rollable: true, usable: true}, {id: 2, side: 2, rollable: true, usable: true}, 
    {id: 3, side: 0, rollable: true, usable: true}, {id: 4, side: 0, rollable: true, usable: true}, 
    {id: 5, side: 0, rollable: true, usable: true}, {id: 6, side: 0, rollable: true, usable: true}
  ],
  rolls_left: 3,
  did_this_turn: {moved: false, added_hp: false, removed_doubts: false, fed: false},
  turn: 1,
  stats: {}
}

// export default initial_state
export default {initial_state, fake_state}
