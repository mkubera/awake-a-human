'use strict';
import React from 'react';


class Portion extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    const {name, id, hp, doubts_no, is_hero_present, feed_level, moveable, hpable, doubtable, feedable} = this.props;
    const {moved, added_hp, removed_doubts, fed} = this.props.did_this_turn;
    const {moveHero, addHp, removeDoubts, feed} = this.props;

    return (
      <div className={`portion`}>
        
        <div className="portion-left">
        
          <div className="portion-left-header">
            <div>{name}</div>
          </div>
          
          <div className={`portion-left-top portion-${name}`}>
            {/* MOVE */}
            <div id={`Portion${id}`} 
                 className={moveable && !moved && !is_hero_present ? "move moveable" : "move"} 
                 onClick={moveable && !moved && !is_hero_present ? moveHero : null}>MOVE!</div>

            {/* HERO */}
            <div className={is_hero_present ? "hero" : ""}>{is_hero_present ? "Hero" : ""}</div>

            {/* DOUBTS */}
            <div>
              <span id={`Portion${id}`}
                className={doubtable && !removed_doubts ? "doubt doubtable" : "doubt"} 
                onClick={doubtable && !removed_doubts ? removeDoubts : null}>-</span>
                Doubt (x{doubts_no})
            </div>
          </div>

          {/* HP COUNTER */}
          <div className="portion-left-bottom">
            <div className="portion-left-bottom-wrap">
                <span id={`Portion${id}`} 
                      className={hpable && !added_hp ? "addhp hpable" : "addhp"} 
                      onClick={hpable && !added_hp ? addHp : null}
                      >+</span><span className="hp-counter">{hp} hp</span>
            </div>
          </div>
        </div>
        
        <div className="portion-right">
          {/* FEED LEVEL */}
          <div>
            <span id={`Portion${id}`}
                  className={feedable && !fed && is_hero_present ? "feed feedable" : "feed"}
                  onClick={feedable && !fed && is_hero_present ? feed : null}
                  >+</span> feed<br/> lvl<br/> <span className="feedlevel">{feed_level}</span>
          </div>
        </div>
        
      </div>
    );
  }

}

export default Portion;
