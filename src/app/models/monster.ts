import { BaseCharacter } from "./base-character";
import { Weapon } from "./weapon";

export class Monster extends BaseCharacter {
  /**
   * Our Ranges will have the ability to trap an enemy
   */
  isTrapped: boolean = false; 
  /**
   * Our Rouge will have the ability to poison an enemy
   * This can be increased, the more poisonStack the
   * more dmg they take every single turn.
   */
  poisonStacks: number = 0; 
  /**
   * Another point of Rouges is that as they level up
   * they can improve their poison to be a strong posion.
   */
  isStrongPoison: boolean = false;
  /**
   * Check if already has taken poison damage
   * in that turn, if it is not, do the poison
   * damage - if it has, move on.
   */
  hasTakenPoisonDamageThisTurn: boolean = false;

  constructor(
    name, 
    health, 
    skills, 
    barriers: {attack: number, sneak: number, persuade: number}, 
    minDamage, 
    maxDamage, 
    spriteUrl) {

      super(name, health, skills);

      /**
       * Overriding the default barriers
       * we set in the base class.
       */
      this.barriers = barriers;
      this.equippedWeapon = new Weapon(undefined, minDamage, maxDamage);
      /**
       * Image for our monster
       */
      this.spriteUrl = spriteUrl;
  }
}