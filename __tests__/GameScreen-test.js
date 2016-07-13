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
import _ from 'lodash'
import GameScreen from '../app/js/GameScreen.js'

describe("<GameScreen />", () => {

  var comp;

  beforeEach(() => {
    comp = TestUtils.renderIntoDocument(<GameScreen />)
  })

  it("should render", () => {
    expect(TestUtils.isCompositeComponent(comp)).toBeTruthy()
  })
  
  it("should display Turn Counter", () => {
    const turncounter = TestUtils.findRenderedDOMComponentWithClass(comp, 'turncounter')
    expect(turncounter.textContent).toBe("1")
  })
  
  
  it("should display four <Portion/> components", () => {
    const portions = TestUtils.findRenderedDOMComponentWithClass(comp, 'portions')
    
    expect(portions.children.length).toBe(4)
  })
  
  it("should display RollsLeft counter", () => {
    const rollsleft = TestUtils.findRenderedDOMComponentWithClass(comp, 'rollarea-rollsleft')
    
    expect(rollsleft.textContent).toBe("3")
  })
  
  it("should display a Rollarea with 6 dice + RollAgain & EndTurn buttons", () => {
    const rollarea = TestUtils.findRenderedDOMComponentWithClass(comp, 'rollarea')
    const dice = TestUtils.scryRenderedDOMComponentsWithClass(comp, 'rollarea-die')
    const rollAgain = TestUtils.findRenderedDOMComponentWithClass(comp, 'rollarea-rollAgain')
    const finish = TestUtils.findRenderedDOMComponentWithClass(comp, 'rollarea-finishTurn')
    const dice_results = dice.map((die) => Number(die.textContent))
  
    expect(rollarea).toBeTruthy()
    expect(dice.length).toBe(6)
    expect(rollAgain).toBeTruthy()
    expect(finish).toBeTruthy()
  
    expect(dice_results).toEqual([0, 0, 0, 0, 0, 0])
    expect(rollAgain.textContent).toBe("ROLL AGAIN")
    expect(finish.textContent).toBe("END TURN")
  })
  
  it("should [RollAgain btn] roll only rollable dice + decrease Rolls Left counter", () => {
    const rollAgain = TestUtils.findRenderedDOMComponentWithClass(comp, 'rollarea-rollAgain')
    const dice = TestUtils.scryRenderedDOMComponentsWithClass(comp, 'rollarea-die')
    const rollsleft = TestUtils.findRenderedDOMComponentWithClass(comp, 'rollarea-rollsleft')
    // all dice's textContent is "" because they haven't been rolled yet
    const rollable_dice = [dice[1], dice[3], dice[5]]
    const unrollable_dice = [dice[0], dice[2], dice[4]]
  
    TestUtils.Simulate.click(dice[0])
    TestUtils.Simulate.click(dice[2])
    TestUtils.Simulate.click(dice[4])
  
    expect(dice[0].className).toBe("rollarea-die")
    expect(dice[1].className).toBe("rollarea-die rollarea-die--rollable")
    expect(dice[2].className).toBe("rollarea-die")
    expect(dice[3].className).toBe("rollarea-die rollarea-die--rollable")
    expect(dice[4].className).toBe("rollarea-die")
    expect(dice[5].className).toBe("rollarea-die rollarea-die--rollable")
  
    expect(rollsleft.textContent).toBe("3")
    
    TestUtils.Simulate.click(rollAgain)
    
    expect(rollsleft.textContent).toBe("2")
    
    rollable_dice.forEach((die) => {
      return expect(die.textContent).not.toBe("")
    })
    unrollable_dice.forEach((die) => {
      return expect(die.textContent).toBe("")
    })
    
    TestUtils.Simulate.click(rollAgain)
    expect(Number(rollsleft.textContent)).toEqual(1)
    TestUtils.Simulate.click(rollAgain)
    expect(Number(rollsleft.textContent)).toEqual(0)
    TestUtils.Simulate.click(rollAgain)
    expect(Number(rollsleft.textContent)).toEqual(0)
  })
  
  it(`should [StartGame btn] roll all dice 
      + decrease Rolls Left counter 
      + hide StartGame btn`, () => {
    const startGame = TestUtils.findRenderedDOMComponentWithClass(comp, 'startGame')
    const dice = TestUtils.scryRenderedDOMComponentsWithClass(comp, 'rollarea-die')
    const rollsleft = TestUtils.findRenderedDOMComponentWithClass(comp, 'rollarea-rollsleft')
    
    expect(startGame).toBeTruthy()
    
    expect(rollsleft.textContent).toBe("3")
    
    TestUtils.Simulate.click(startGame)
    
    dice.forEach((die) => expect(die.textContent).not.toBe(""))
    expect(rollsleft.textContent).toBe("2")
    
    expect(startGame.className).toBe("startGame hidden")
  })
  
  it(`should [EndTurn btn] roll all dice 
      + increase turn count by 1 
      + reset RollsLeft counter`, () => {
    const finish = TestUtils.findRenderedDOMComponentWithClass(comp, 'rollarea-finishTurn')
    const dice = TestUtils.scryRenderedDOMComponentsWithClass(comp, 'rollarea-die')
    const turncounter = TestUtils.findRenderedDOMComponentWithClass(comp, 'turncounter')
    const rollsleft = TestUtils.findRenderedDOMComponentWithClass(comp, 'rollarea-rollsleft')
    
    const dice_results = dice.map((die) => die.textContent)
  
    expect(turncounter.textContent).toBe("1")
  
    TestUtils.Simulate.click(finish)
  
    expect(rollsleft.textContent).toBe("2")
    expect(turncounter.textContent).toBe("2")
    
    const new_dice_results = dice.map((die) => die.textContent)
    
    // this can backfire as theoretically both rolls of 6 dice may give the same result
    // solution...?
    expect(dice_results).not.toBe(new_dice_results)
  })
  
})
