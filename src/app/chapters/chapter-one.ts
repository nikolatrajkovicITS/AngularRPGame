import { Chapter } from "../models/chapter/chapter";
import { CharacterAction } from "../models/chapter/character-action";
import { Monster } from '../models/monster';
import { FailureOptions } from "../models/chapter/failure-options";
import { SuccessOptions } from "../models/chapter/success-options";
import { Weapon } from "../models/weapon";
import { Warrior } from '../models/hero/warrior';
import { GenderOptions } from '../models/character/gender-options';
import { RaceOptions } from '../models/character/race-options';
import { Armor } from "../models/armor";

export const Chapter1: Chapter = {
  story: [
    `You enter the woods, chasing after the goblin who stole your father's sword. You lose sight of them in the thick woods and begin to creep forward, relyingon your ears to warm you of danger and hopefully to locate the theiving goblin.`,
    `Shenanigans ensue and an encounter begins. Now the question is: How do you want to handle it?`
  ],
  options: [
    CharacterAction.attack,
    CharacterAction.sneak,
    CharacterAction.persuade
  ],
  enemyParty: [
    new Monster("Goblin", 5, {attack: 2, sneak: 0, persuade: 0}, {attack: 10, sneak: 10, persuade: 10}, 1, 3, "../../assets/images/goblin.png")
  ],
  sneakPersuadeFail: CharacterAction.attack,
  ifFail: FailureOptions.restartChapter,
  ifSucceed: [
    SuccessOptions.rewardEquipment,
    SuccessOptions.rewardEquipment,
    SuccessOptions.addHeroToParty
  ],
  rewards: {
    experience: 500,
    equipment: [new Weapon("Rusty Sword", 1, 6)],
    newHero: new Warrior("Donderion", GenderOptions.male, RaceOptions.human, 1, 7, {attack: 3, sneak: 2, persuade: 1, intelligence: 1}, new Weapon("Dagger", 1, 4), new Armor("Clothes", 0))
  },
  nextChapter: null
}