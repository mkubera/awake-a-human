'use strict';

jest.unmock('../app/js/state/init.js')
jest.unmock('../app/js/utils/fn.js')
jest.unmock('../app/js/utils/acts.js')
jest.unmock('../app/js/utils/calc.js')
jest.unmock('../app/js/utils/winlose.js')
jest.unmock('../app/js/GameScreen.js')
jest.unmock('../app/js/Portion.js')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils'
import Portion from '../app/js/Portion.js'

describe("<Portion />", () => {

  const mockFn = jest.fn()
  const basic_props = { name: "Mind", id: 1, hp: 5, doubts_no: 1, is_hero_present: true,
                  moveable: false, hpable: false, doubtable: false, feedable: false,
                  did_this_turn: {
                    moved: false, added_hp: false, removed_doubts: false, fed: false },
                  moveHero: mockFn(), 
                  addHp: mockFn(), 
                  removeDoubts: mockFn(), 
                  feed: mockFn()
                }
                

  it("should render", () => {
    let comp = TestUtils.renderIntoDocument(<Portion {...basic_props} />)
    
    expect(TestUtils.isCompositeComponent(comp)).toBeTruthy()
  })
  
  it("should display hp counter", () => {
    let comp = TestUtils.renderIntoDocument(<Portion {...basic_props} />)
    const hp_counter = TestUtils.findRenderedDOMComponentWithClass(comp, 'hp-counter')
  
    expect(hp_counter).toBeTruthy()
    expect(hp_counter.textContent).toBe("5 hp")
  })
  
  it("should display Doubts", () => {
    let comp = TestUtils.renderIntoDocument(<Portion {...basic_props} />)
    const doubts = TestUtils.scryRenderedDOMComponentsWithClass(comp, 'doubt')
  
    expect(doubts.length).toBe(1)
  })
  
  it("should display the hero if the hero is present", () => {
    let comp = TestUtils.renderIntoDocument(<Portion {...basic_props} />)
    const hero = TestUtils.findRenderedDOMComponentWithClass(comp, 'hero')
  
    expect(hero).toBeTruthy()
  })
  
  it("should display Feed counter", () => {
    let comp = TestUtils.renderIntoDocument(<Portion {...basic_props} />)
    const feedlevel = TestUtils.findRenderedDOMComponentWithClass(comp, 'feedlevel')
    
    expect(feedlevel).toBeTruthy()
  })
  
  it("should have + button when player can add HP to a Portion", () => {
    let hpable_true = {hpable: true}
    let props = {...basic_props, ...hpable_true}
    let comp = TestUtils.renderIntoDocument(<Portion {...props} />)
    
    const hpable = TestUtils.findRenderedDOMComponentWithClass(comp, 'hpable')
    
    expect(hpable.textContent).toBe("+");
  })
  
  it("should have + button when player can Feed a Portion", () => {
    let hpable_true = {feedable: true}
    let props = {...basic_props, ...hpable_true}
    let comp = TestUtils.renderIntoDocument(<Portion {...props} />)
    
    const feedable = TestUtils.findRenderedDOMComponentWithClass(comp, 'feedable')
    
    expect(feedable.textContent).toBe("+");
  })
  
  it("should have - button when player can remove a Doubt from a Portion", () => {
    let hpable_true = {doubtable: true}
    let props = {...basic_props, ...hpable_true}
    let comp = TestUtils.renderIntoDocument(<Portion {...props} />)
    
    // console.log(props);
    
    const doubtable = TestUtils.findRenderedDOMComponentWithClass(comp, 'doubtable')
    
    expect(doubtable.textContent).toBe("-");
  })
  
  it("should have Move! button when player can move a Hero to a Portion", () => {
    let hpable_true = {moveable: true}
    let hero_not_present = {is_hero_present: false}
    let props = {...basic_props, ...hpable_true, ...hero_not_present}
    let comp = TestUtils.renderIntoDocument(<Portion {...props} />)
    
    // console.log(props);
    
    const moveable = TestUtils.findRenderedDOMComponentWithClass(comp, 'moveable')
    
    expect(moveable.textContent).toBe("MOVE!");
  })
  
})
