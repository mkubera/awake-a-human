'use strict';
import actions from './acts.js'
import calc from './calc.js'
import winlose from './winlose.js'

export default
{ ...actions
, ...calc
, ...winlose
}
