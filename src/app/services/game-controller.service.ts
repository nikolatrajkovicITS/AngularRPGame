import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../models/hero/hero';
import { Chapter } from '../models/chapter/chapter';
import { Chapter1 } from '../chapters/chapter-one';
import { Armor } from '../models/armor';
import { Weapon } from '../models/weapon';
import { Monster } from '../models/monster';
import { ClassOptions } from '../models/character/class-options';
import { GenderOptions } from '../models/character/gender-options';
import { RaceOptions } from '../models/character/race-options';
import { Warrior } from '../models/hero/warrior';
import { Ranger } from '../models/hero/ranger';
import { Priest } from '../models/hero/priest';
import { Rogue } from '../models/hero/rogue';
import { checkRace } from '../models/character/characters';

@Injectable() 
export class GameControllerService { 
  mainCharacter: Hero;
  currentChapter: Chapter = Chapter1;
  /**
   * This is that in certain comp's we can lock down functionality.
   * Say that we are in fight encounter, we don't want our user to 
   * be open up our inventory and pass the equipment around or 
   * change which heroes are in their party cus they're already in 
   * the encounter. We want to make sure that's done only outside
   * of the actual fighting experience. 
   * So here we can keep our boolean that we can use to lock down
   * those funcionalities.
   */
  isFighting: boolean = false;
  /**
   * The actionDelay will be number of miliseconds that will wait
   * before taking the next step in our fighting counter. If we 
   * don't have delays in certain parts of our code the fight will
   * happen instantaneously. 
   */
  actionDelay: number = 1500;
  heroParty: Hero[] = [];
  /**
   * Is going to be a split type array 
   */
  partyInventory: (Weapon | Armor)[] = [];
  /**
   * In our inventory we are going to be able to change which heroes
   * we have in our party. So we need place to keep the heroes we 
   * have with us but that aren't in our party.
   * This will store the extra heroes that we have, that can't fit
   * the party, cus party is going to be limited to three heroes.
   */
  availableHeroes: Hero[] = [];
  /**
   * We need a reference to the enemies that we're fighting or try
   * to sneak past or try to persuade.
   */
  enemyParty: Monster[] = this.currentChapter.enemyParty;

  /**
   * Fist we need to create reference to the router to can navigate the user 
   * to different componentes.
   */
  constructor(private router: Router) { }

  /**
   * This are the information we're getting in our create-character page,
   *  we'll pass that into here and create our main character.
   */
  setMainCharacter(character: {name: string, class: ClassOptions, race: RaceOptions, gender: GenderOptions}) {
    switch (character.class) {
      case ClassOptions.warrior:
          this.mainCharacter = new Warrior(
            character.name, 
            character.gender, 
            character.race, 
            1, 
            10, 
            {attack: 0, sneak: 0, persuade: 0, intelligance: 0}, 
            new Weapon("Axe", 1, 3), 
            new Armor("Clothes", 0) 
          );
          break;
      case ClassOptions.ranger:
          this.mainCharacter = new Ranger(
            character.name, 
            character.gender, 
            character.race, 
            1, 
            9, 
            {attack: 0, sneak: 0, persuade: 0, intelligance: 0}, 
            new Weapon("crossbow", 1, 3), 
            new Armor("Clothes", 0) 
          );
          break;
      case ClassOptions.rogue:
          this.mainCharacter = new Rogue(
            character.name, 
            character.gender, 
            character.race, 
            1, 
            8, 
            {attack: 0, sneak: 0, persuade: 0, intelligance: 0}, 
            new Weapon("Sword", 1, 3), 
            new Armor("Clothes", 0) 
          );
          break;  
      case ClassOptions.priest:
          this.mainCharacter = new Priest(
            character.name, 
            character.gender, 
            character.race, 
            1, 
            7, 
            {attack: 0, sneak: 0, persuade: 0, intelligance: 0}, 
            new Weapon("Wand", 1, 3), 
            new Armor("Clothes", 0) 
          ); 
    }

    checkRace(this.mainCharacter);
    this.heroParty.push(this.mainCharacter);
  }

}