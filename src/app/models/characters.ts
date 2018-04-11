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

export const ExperienceToLevel = {
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

export class Hero extends BaseCharacter { 
    gender: string;
    race: string;
    characterRole: string;
    experience: number;
    level: number;
    /**
     * When our hero's level up they'll
     * gain some available skill points
     * to upgrade their various skills.
     */
    availableSkillPoints: number;
    /**
     * When the Ranger uses his special attack 
     * he can select an ally to defend with a
     * trap. (the next time when monsters try 
     * to attack the character, they will be 
     * stopped and lose their next turn)
     */
    hasTrapDefence: boolean;
    /**
     * Once the Ranger levels up his trap not
     * only takes their turn but deals damage
     * as well.
     */
    hasDamagingTrap: boolean;
    /**
     * You can use only your special attack
     * the way I will set it, every outher turn.
     * So we need to keep track of, if they've
     * used the recently how long they have 
     * until they can use it again.
     */
    turnsUntilSpecialAvailableAgain: number;

    constructor(name, gender, race, level, health, skills, weapon, armor) {
        super(name, health, skills);

        this.gender = gender;
        this.race = race;
        this.experience = 0;
        this.level = level;
        this.equippedWeapon = weapon;
        this.equippedArmor(armor);
    }

    levelUp(): void {
        this.experience -= ExperienceToLevel[this.level];
        this.level++;
        this.availableSkillPoints +=2;
        /**
         * If user end up being a boss and getting a crazy amount
         * of experience you can level up multiple times in a row
         * without having to run a weird number of checks in the 
         * code in game controller.
         */
        if (this.experience >= ExperienceToLevel[this.level]) {
            this.levelUp();
        }
    }

    /**
     * 
     */
    equipNewArmor(armor: Armor): void {
        /**
         * If they do have some equipt armor then we want to reduce
         * our attack-barrier bonus by whatever that armor was giving
         * us. 
         */
        if (this.equippedArmor) {
            this.barriers.attack -= this.equippedArmor.attackBarrierBonus;
        }
        this.equippedArmor = armor;
        this.barriers.attack += armor.attackBarrierBonus;
    }
    
    equipNewWeapon(weapon: Weapon): void {
        this.equippedWeapon = weapon;
    }

    /**
     * For healing our character
     */
    rest(): void {
       this.currentHealth = this.maxHealth;
       this.isIncapacitated = false;
       this.turnsUntilSpecialAvailableAgain = 0;
    }
}