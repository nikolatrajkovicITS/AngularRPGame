import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  /**
   * This syntax maybe will be a problem **********************
   */
  addCssClasses() {
    return "'active': currentCharacter === hero, 'targetable': availableTargets === teams.heroes && !hero.isIncapacitated";
  }

}
