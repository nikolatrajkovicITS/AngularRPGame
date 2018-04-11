import { RaceOptions, ClassOptions, GenderOptions } from './character-options';

export class Armor {
  /**
   * @param attackBarrierBonus - increase 
   * our hero's defense against attacks.
   */
  constructor(public name: string, public attackBarrierBonus: number) {  }
}

export class Weapon {
  constructor(public name: string, public minDamage: number, public maxDamage: number) {  }
}

export enum CharacterSkills {
    attack = "attack",
    sneak = "sneak",
    persuade = "persuade",
    intelligence = "intelligence"
}

/**
 * none option - it will be helpful in our code,
 * so we can check to see if we have a selected action
 */
export enum FightOptions {
    attack = "Attack",
    specialAttack = "Special Attack",
    none = "None"       
}

export const ExperianceToLevel = {
    1: 1000,
    2: 2000,
    3: 3000,
    4: 4000,
    5: 5000,
    6: 6000,
    7: 7000,
    8: 8000,
    9: 9000
}

export class BaseCharacter {
    name: string;
    maxHealth: number;
    currentHealth: number;
    /**
     * If a character is incapacitated they wont be able to interact
     * or be involved in the fight, enemies wont target them and 
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

    constructor(name, health, skills, barriers: {attack: number, sneak: number, persuade: number}, minDamage, maxDamage, spriteUrl) {
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