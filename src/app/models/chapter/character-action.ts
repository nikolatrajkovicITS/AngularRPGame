/**
 * Here we'll define the options that our characters can have
 * to progress in the story. So they can choose to attack the
 * enemy, sneak past the enemy, try to talk their way out of it
 * or they can do nothing. 
 */
export enum CharacterAction {
    attack = "Attack",
    sneak = "Sneak",
    persuade = "Persuade",
    doNothing = "doNothing"
}