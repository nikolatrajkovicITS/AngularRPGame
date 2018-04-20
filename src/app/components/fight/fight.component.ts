import { Component } from '@angular/core';
import { GameControllerService } from '../../services/game-controller.service';
import { Router } from '@angular/router';
import { Hero } from '../../models/hero/hero';
import { Monster } from '../../models/monster';
import { BaseCharacter } from '../../models/character/base-character';
import { FightOptions } from '../../models/character/fight-options';
import { Warrior } from '../../models/hero/warrior';
import { Ranger } from '../../models/hero/ranger';
import { Rogue } from '../../models/hero/rogue';
import { Priest } from '../../models/hero/priest';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent {
   /**
    * We have the hero's turn or the enemies turn.
    */
   heroTurn: boolean = true;
   actionDelay: number = this.gameControllerService.actionDelay;
   /**
    * This will set how many turns we have between specail attack again.
    * 2 value is for every other turn.
    */
   turnsBetweenSpecial: number = 2;
   characterIndex: number = 0;
   /**
    * We're going to freeze actions while the game is thinking about 
    * something, when it's the enemies turn.
    */
   freezeActions: boolean = false;

   heroParty: Hero[] = this.gameControllerService.heroParty;
   /**
    * Keeping track how many heroes we have incapacitated so
    * if we have all our heroes incapacitated, we've lost. 
    */
   hearoesIncapacitated: number = 0;
   enemyParty: Monster[] = this.gameControllerService.enemyParty;
   enemiesIncapacitated: number = 0;

   /**
    * Keep track who is the current character, whose turn is it.
    */
   currentCharacter: BaseCharacter = this.heroParty[this.characterIndex];
   _fightOptions: typeof FightOptions = FightOptions;
   _teams: typeof Teams = Teams;
   selectedAction: FightOptions = FightOptions.none;
   availableTargets: Teams = Teams.none;
   /**
    * There are a couple of special attacks that will allow us to pick
    * two targets, to keep track to both of those targets.
    * We're going push them into this array.
    */
   selectedTargets: BaseCharacter[] = [];

   displayMessage: string = `${this.currentCharacter.name}'s turn.`;
   successMessages: string[] = [];
   showNextChapterButton: boolean = false;
   showGameOverButton: boolean = false;

  constructor(
      private gameControllerService: GameControllerService,
      private router: Router) { }

  /**
   * When we click either attack or special attack it will set the
   * selected option to either fightOptions to attack or special 
   * attack.
   */
  selectOption(selectedOption: FightOptions) {
    if (this.freezeActions && this.heroTurn) {
      return;
    }
    this.selectedAction = selectedOption;
    this.selectedTargets = [];

    if (this.selectedAction === FightOptions.attack) {
      this.availableTargets = Teams.enemies;
      this.displayMessage = "Select a target for your attack.";
    } else if (this.selectedAction === FightOptions.specialAttack
              && this.currentCharacter instanceof Hero
              && this.currentCharacter.level < 3) {

        this.displayMessage = `Special attack unlock for a character once they reached level 3.`;
    } else if (this.selectedAction === FightOptions.specialAttack
      && this.currentCharacter instanceof Hero
      && this.currentCharacter.level > 2) {

        if (this.currentCharacter.turnsUntilSpecialAvailableAgain) {
          this.displayMessage = `Cannot use special attack yet. ${this.currentCharacter.turnsUntilSpecialAvailableAgain} turn(s) until it is avaialable again.`;
        } else {
            if (this.currentCharacter instanceof Warrior) {
              this.availableTargets = Teams.enemies;
              this.displayMessage = `Attack two targets at once with a small attack penalty. At level 6 and above, the attack penalty is removed. The two target may be the same enemy.`;              
            }
            if (this.currentCharacter instanceof Ranger) {
              this.availableTargets = Teams.heroes;
              this.displayMessage = `Setup a trap to protect one of your heroes. The trap will prevent al damage and the enemy will take a turn to free itself from the trap. At level 6 and above, the trap will also deal up to 8 damage.`;              
            }
            if (this.currentCharacter instanceof Rogue) {
              this.availableTargets = Teams.enemies;
              this.displayMessage = `Poison an enemy or add another stack of poison to an enemy to do up 3 damage, with each stack of poison multiplying the damage. At level 6 and above, the damage is up to 1 - 6 times the number of poison stacks.`;              
            }
            if (this.currentCharacter instanceof Priest) {
              this.availableTargets = Teams.heroes;
              this.displayMessage = `Select a hero to heal for up to 6 health plus an additional point for each point in the intelligence skill. At level 6 and above, you choose two targets to heal. The two targets can be the same hero.`;              
            }
        }
      }
  }    

  tryAttack(target: BaseCharacter) {
    if (this.freezeActions) {
      return;
    }
    if (target.isIncapacitated) {
      this.displayMessage = "That target is already incapacitated.";
      return;
    }

    if (this.currentCharacter instanceof Monster && target instanceof Hero) {

    }
    if (this.selectedAction === FightOptions.attack) {
      this.freezeActions = true;
      this.attack(target);
    } else if (this.currentCharacter instanceof Hero) {

      } else {
        this.displayMessage = `Please select an action option.`;
      }
  }

  attack(target: BaseCharacter) {
    this.availableTargets = Teams.none;
    if (this.currentCharacter.attack() >= target.barriers.attack) {
      let damage = this.currentCharacter.dealDamage();
      target.currentHealth -= damage;
      this.displayMessage = `${this.currentCharacter.name} hit ${target.name} dealing ${damage} damage.`;
      setTimeout(() => {
        if (target.currentHealth <= 0) {
          target.isIncapacitated = true;
          this.heroTurn ? this.enemiesIncapacitated++ : this.hearoesIncapacitated++;
          this.checkIfWin();
        } else {
          this.nextTurn();
        }
      }, this.actionDelay);
    } else {
        this.displayMessage = `${this.currentCharacter.name} Missed.`;
        setTimeout(() => {
          this.nextTurn();
        }, this.actionDelay);
      }
  }

  checkIfWin() {
    this.selectedAction = FightOptions.none;
    if (this.enemiesIncapacitated === this.enemyParty.length) {
      this.displayMessage = `All enemies have been defeated!`;
      this.successMessages = this.gameControllerService.encounterSuccess();
      this.showNextChapterButton = true;
      this.gameControllerService.isFighting = false;
      return;
    } 
    if (this.hearoesIncapacitated === this.heroParty.length) {
      this.displayMessage = `All heroes have been defeated!`;
      this.showGameOverButton = true;
      this.gameControllerService.isFighting = false;
      return;
    }
    this.nextTurn();
  }

  nextTurn() {
    if (this.currentCharacter instanceof Monster) {

    }
    if (this.currentCharacter instanceof Monster && this.currentCharacter.hasTakenPoisonDamageThisTurn) {
      
    }

    this.availableTargets = Teams.none;
    this.selectedAction = FightOptions.none;
    this.characterIndex++;
    let nextCharacter;

    if (this.heroTurn) {
      nextCharacter = this.heroParty[this.characterIndex];
    } else {
      nextCharacter = this.enemyParty[this.characterIndex];
    }

    if (nextCharacter) {
      if (!nextCharacter.isIncapacitated) {
        this.currentCharacter = nextCharacter;
        this.displayMessage = `It's ${this.currentCharacter.name}'s turn.`;
        if (this.currentCharacter instanceof Hero) {
          this.freezeActions = false;
          if (this.currentCharacter.turnsUntilSpecialAvailableAgain) {
            this.currentCharacter.turnsUntilSpecialAvailableAgain--;
          }
        } else {
            setTimeout(() => {
              this.takeEnemyTurn();
          }, this.actionDelay);
        }
      } else {
          this.nextTurn();
      }
    } else {
        this.heroTurn = !this.heroTurn;
        this.characterIndex = -1;
        this.nextTurn();
    }
  }

  takeEnemyTurn() {
    if (this.currentCharacter instanceof Monster && this.currentCharacter.isTrapped) {
      this.currentCharacter.isTrapped = false;
      this.displayMessage = `${this.currentCharacter.name} freed itself from the`;
    } else {
      let target: Hero;
      this.selectedAction = FightOptions.attack;

      while (!target) {
        let randomTargetIndex = Math.floor(Math.random() * this.heroParty.length);
        let potentialTarget = this.heroParty[randomTargetIndex];
        if (!potentialTarget.isIncapacitated) {
          target = potentialTarget;
        }
      }
      this.displayMessage = `${this.currentCharacter.name} attacks ${target.name}.`;

      setTimeout(() => {
        this.tryAttack(target);
      }, this.actionDelay);
    }
  }

  nextChapter() {
    this.gameControllerService.nextChapter();
    this.router.navigateByUrl("/story");
  }

  gameOver() {
    this.gameControllerService.gameOver();
  }
  

  /**
   * This syntax maybe will be a problem ***
   */
  addCssClasses() {
    return "'active': currentCharacter === hero, 'targetable': availableTargets === teams.heroes && !hero.isIncapacitated";
  }

}
