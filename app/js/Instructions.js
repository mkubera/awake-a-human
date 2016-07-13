'use strict';
import React from 'react';

class Instructions extends React.Component {

  render() {
    return (
      <div className="instructions">
        <div>
          <h3>The game</h3>
        </div>
        
        <div>
          <h4>Title</h4>
          Awake a Human: a dice game
        </div>
        
        <div>
          <h4>Description</h4>
          <p>Awake a human being! Feed every Portion (Mind, Heart, Spirit, Body) while making sure that Doubts do not bring any Portion to the level of self-doubtfulness.</p>
        </div>
        
        <div>
          <h4>Rules</h4>
          <ul>
            <li>Every turn player can roll six dice up to three times.</li>
            <li>Clicking on a die will prevent it from being rolled (clicking again will revert it).</li>
            <li>Once player is satisfied, he/she should take an action (e.g. move or increase hp). Once that occurs, no more rolls can happen in this turn. Once all desired actions have been taken, player needs to advance to a next turn by clicking "End Turn".</li>
            <li>Player can do any of these actions (every turn &amp; in any order): 
              <ul>
                <li>Move from one Portion to another</li>
                <li>Increase Hp of a Portion</li>
                <li>Remove Doubts from a Portion</li>
                <li>Feed a Portion (love is food for the Heart, liberation food for the Mind, and so forth)</li>
              </ul>
            </li>
            <li>Player needs a specific dice result to be able to take an action:
              <ul>
                <li>(to Move) Move dice x2 or more</li>
                <li>(to Increase Hp of a Portion) Hp dice x2-6 (&rarr; adds between 1 and 5 hp) </li>
                <li>(to Remove Doubts from a Portion) Doubts dice x2-6 (&rarr; removes between 1 and 5 doubts) </li>
                <li>(to Feed a Portion) Feed dice x2 or more (&rarr; increases feed level by 1) </li>
              </ul>
            </li>
            <li>Feeding can only take place in the Portion where the player is currently present. Other actions can be taken ad hoc.</li>
            <li>At the end of every Turn:
              <ul>
                <li>Doubts will remove health points equal to their (Doubts') number in each Portion (e.g. 2 Doubts at the end of turn in Heart Portion will cause the Heart Portion to lose 2 health points)</li>
                <li>A new Doubt will randomly appear in a Portion</li>
              </ul>
            </li>
            <li>Once player manages to awake all the Portions, while not losing a single Portion to Doubts (hp never falls to 0), he/she wins.</li>
          </ul>
        </div>

        <div>
          <h4>Artist's comment</h4>
          <p>Please, do excuse me the unpoetic instructions; I'm truly stressed for time at the present.</p>
          <p>Nevertheless, I hope you will enjoy this little effort of mine.</p>
          <p><i>When humans awake, magic is reinvited into the world.</i></p>
          <p>Faithful to the unborn generations,</p>
          <p>-rainteller</p>
        </div>
        <br />
      </div>
    );
  }

}

export default Instructions;
