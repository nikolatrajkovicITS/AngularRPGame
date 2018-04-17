import { Component } from '@angular/core';
import { GameControllerService } from '../../services/game-controller.service';
import { Router } from '@angular/router';
import { Hero } from '../../models/hero/hero';
import { Monster } from '../../models/monster';
import { CharacterAction } from '../../models/chapter/character-action';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent {
  currentChapter = this.gameControllerService.currentChapter;
  heroParty: Hero[] = this.gameControllerService.heroParty;
  enemyParty: Monster[] = this.gameControllerService.enemyParty;

  actionDelay: number = this.gameControllerService.actionDelay;
  displayMessage: string = "";
  successMessages: string[] = [];
  showNextChapterButton: boolean = false;

  constructor(
      private router: Router,
      private gameControllerService: GameControllerService) { }
  
  /**
   * First we check if we have successful encounter then
   * we don't want to allow our users to re-click an 
   * encounter.
   */
  chooseAction(action: string): void {
    if (this.successMessages.length) {
      return;
    }

    this.displayMessage = `You decide to ${action}.`;
    setTimeout(() => {
      switch(action) {
        case CharacterAction.attack:
          this.tryAttack();
          break;
        case CharacterAction.sneak:
          this.trySneak();
          break;
        case CharacterAction.persuade:
          this.tryPersuade();
          break;
        case CharacterAction.doNothing:
          this.doNothing();
          break;
        default: 
          console.log("Something went horrible")
      }
    }, this.actionDelay);
  }

  tryAttack(): void {
    this.gameControllerService.isFighting = true;
    this.router.navigateByUrl("/fight");
  }

  /**
   * This method will look at our heroes, have
   * them all try to sneak some up thier total
   * and have the enemies some of them total 
   * barriers, see if we equal it or overcome it.
   * If we do, it's successful, if we don't, we
   * missed.
   * So to walk through that logic first sneak
   * in counter. We're going to have our total
   * sneakBarrier and total sneakPower which 
   * is going to be our heroes cumulative 
   * attempt at sneaking.
   * Then we want to loop through each of our
   * enemies and add thier sneak barrier to 
   * our barrier tottal and reach our heroes,
   * add result of their sneak method to our power.
   */
  trySneak(): void {
    let sneakBarrier = 0;
    let sneakPower = 0;
    this.enemyParty.forEach(enemy => {
      sneakBarrier += enemy.barriers.sneak;
    });
    this.heroParty.forEach(hero => {
      sneakPower += hero.sneak();
    });
    if (sneakPower >= sneakBarrier) {
      this.displayMessage = `Your attempt at sneaking was a success!`;
      setTimeout(() => {
        this.onSuccess();
      }, this.actionDelay);
    } else {
      this.displayMessage = `Your attempt at sneaking was a failure!`;
      setTimeout(() => {
        this.onSneakPersuadeFailure();
      }, this.actionDelay);
    }
  }


  tryPersuade(): void {
    let persuasionBarrier = 0;
    let persuasionPower = 0;
    this.enemyParty.forEach(enemy => {
      persuasionBarrier += enemy.barriers.persuade;
    });
    this.heroParty.forEach(hero => {
      persuasionPower += hero.persuade();
    });
    if (persuasionPower >= persuasionBarrier) {
      this.displayMessage = `Your attempt at persuasion was a success!`;
      setTimeout(() => {
        this.onSuccess();
      }, this.actionDelay);
    } else {
      this.displayMessage = `Your attempt at persuasion was a failure`;
      setTimeout(() => {
        this.onSneakPersuadeFailure();
      }, this.actionDelay);
    }
  }

  doNothing(): void {
    this.displayMessage = `You decide to do noting and move on.`;
    setTimeout(() => {
      this.nextChapter();
    }, this.actionDelay);
  }

  onSuccess() {
    this.successMessages = this.gameControllerService.encounterSuccess();
    this.showNextChapterButton = true;
  }

  /**
   * We have options to attack or doNothing, 
   * we setup as default to attack in case 
   * there's another value there.
   */
  onSneakPersuadeFailure(): void {
    switch (this.currentChapter.sneakPersuadeFail) {
      case CharacterAction.attack:
      default: 
        this.displayMessage = `The enemy attacks you.`;
        setTimeout(() => {
          this.tryAttack();
        }, this.actionDelay);
        break;
      case CharacterAction.doNothing:
        this.displayMessage = `Your failure spoiled the opportunity and your part.`;
        setTimeout(() => {
          this.nextChapter();
        }, this.actionDelay);
        break;
    }
  }

  /**
   * Reset all the values in our controller.
   */
  nextChapter(): void {
    this.gameControllerService.nextChapter();
    this.currentChapter = this.gameControllerService.currentChapter;
    this.heroParty = this.gameControllerService.heroParty;
    this.enemyParty = this.currentChapter.enemyParty;
    this.displayMessage = "";
    this.successMessages = [];
    this.showNextChapterButton = false;
  }

}
