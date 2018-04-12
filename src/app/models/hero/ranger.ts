import { Hero } from "./hero";
import { ClassOptions } from "../character/class-options";
import { GenderOptions } from '../character/gender-options';


export class Ranger extends Hero {
  constructor(name, gender, race, level, health, skills, weapon, armor) { 
    super(name, gender, race, level, health, skills, weapon, armor);

    this.characterRole = ClassOptions.warrior;
    this.skills.sneak += 3;
    this.skills.intelligence++;
    this.skills.attack--;
    this.skills.persuade--;
    this.spriteUrl = this.gender === GenderOptions.male ? "./assets/images/ranger-male.png" 
      : "./assets/images/ranger-female.png";
  }

  /**
   * 1.Increase the health
   * 2.Reset the health
   * 3.Then go through experieance 
   * levelUp() from super class.
   */
  levelUp(): void {
    this.maxHealth = Math.floor(Math.random() * 7) + 1;
    this.currentHealth = this.maxHealth;
    super.levelUp();
  }
}