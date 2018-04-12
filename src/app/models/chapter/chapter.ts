import { CharacterAction } from "./character-action";
import { Monster } from "../monster";
import { FailureOptions } from './failure-options';
import { SuccessOptions } from "./success-options";
import { Weapon } from "../weapon";
import { Armor } from "../armor";
import { Hero } from "../hero/hero";

/**
 * Our chapter is going to be the container holding all 
 * of the logic we need for each section of the story.
 * 
 * First what we need is bunch of infirmational text,
 * something to tell the character the user what is 
 * happening in the story.
 */
export class Chapter {
  /**
   * String array that we are able to have multiple
   * paragraphs. Each paragraph is a new string 
   * within the array.
   */
   story: string[];
  /**
   * Options that our user can select to progress
   * through the story, which is defiend as 
   * CharacterAction. We are going to pass an
   * array of those giving them multiple options
   * depending on the scenario.
   */
   options: CharacterAction[];
   /**
    * Is going to be a array of monsters
    */
   enemyPart: Monster[];
   /**
    * What happens if we fail to sneak past or talk 
    * our way out of it. Are enemy going to attack 
    * us or the chapter is going to end or we going 
    * to move on? - For that we need to add a propery 
    * for a sneak persuade fail, if the sneakPersuade
    * fails, then which CharacterAction is going to
    * happen? - Are we going to fight or we are 
    * going to do nothing ?
    */
   sneakPersuadeFail: CharacterAction;
   /**
    * If we fail in a fight encounter then we
    * want to do something else.
    * We want to do one of the failureOptions.
    */
   ifFail: FailureOptions;
   /**
    * If user succeed we want to provide multiple 
    * options, so user can do one or all of our 
    * success options, give experience, new 
    * equipment and add a hero to a party.
    */
   ifSucceed: SuccessOptions[];
   /**
    * To know what to give to our user if
    * he succeed, we need define some rewards.
    */
   rewards: {
     experience: number,
     equipment: (Weapon | Armor)[],
     newHero: Hero
   }
   /**
    * This will be the reference to the next
    * chapter in the way you have the set up
    * your story. Example: From chapter one
    * to chapter two.
    */
   nextChapter: Chapter
}