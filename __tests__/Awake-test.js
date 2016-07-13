'use strict';

jest.unmock('../app/js/Awake.js')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils'
import Awake from '../app/js/Awake.js'

describe("<Awake />", () => {

  it("should render", () => {
    const comp = TestUtils.renderIntoDocument(<Awake />)
    expect(TestUtils.isCompositeComponent(comp)).toBeTruthy()
  })

})
