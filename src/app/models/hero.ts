import { ExperienceToLevel, BaseCharacter } from "./base-character";
import { Armor } from "./armor";
import { Weapon } from "./weapon";

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
      this.equipNewArmor(armor);
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