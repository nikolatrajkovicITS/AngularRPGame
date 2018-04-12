import { Weapon } from "../weapon";
import { Armor } from "../armor";

export class BaseCharacter {
  name: string;
  maxHealth: number;
  currentHealth: number;
  /**
   * If a character is incapacitated they won't be able to interact
   * or be involved in the fight, enemies won't target them and 
   * they won't be able to have a turn.
   */
  isIncapacitated: boolean;     
  barriers: {
      attack: number,
      sneak: number,
      persuade: number
  };
  skills: {
      attack: number,
      sneak: number,
      persuade: number,
      intelligence: number
  };
  equippedWeapon: Weapon;
  equippedArmor: Armor;
  /**
   * this url is to the image
   * that will represent our monster
   */
  spriteUrl: string;          

  constructor(name: string, health: number, skills = { attack: 0, sneak: 0, persuade: 0, intelligence: 0 }) {
     this.name = name;
     this.maxHealth = health;
     this.currentHealth = health;
     this.skills = skills;
     this.isIncapacitated = false;
     this.barriers = {
         attack: 10,
         sneak: 10,
         persuade: 10
     }
  }

  attack() {
      return Math.floor(Math.random() * 20) + 1 + this.skills.attack;
  }

  sneak() {
      return Math.floor(Math.random() * 20) + 1 + this.skills.sneak;        
  }

  persuade() {
      return Math.floor(Math.random() * 20) + 1 + this.skills.persuade;        
  }
  
  /**
   * This will deal dmg that we want
   * between our minDmg and our maxDmg 
   * on our equipped weapon on characher.
   */
  dealDamage() {
      return Math.floor(Math.random() * (this.equippedWeapon.maxDamage - this.equippedWeapon.minDamage + 1)) + this.equippedWeapon.minDamage;
  }
}
