import { Hero } from "./hero";
import { ClassOptions } from "../character/class-options";
import { GenderOptions } from '../character/gender-options';


export class Priest extends Hero {
  constructor(name, gender, race, level, health, skills, weapon, armor) { 
    super(name, gender, race, level, health, skills, weapon, armor);

    this.characterRole = ClassOptions.warrior;
    this.skills.intelligence += 3;
    this.skills.persuade++;
    this.skills.sneak--;
    this.skills.attack--;
    this.spriteUrl = this.gender === GenderOptions.male ? "./assets/images/priest-male.png" 
      : "./assets/images/priest-female.png";
  }

  /**
   * 1.Increase the health
   * 2.Reset the health
   * 3.Then go through experieance 
   * levelUp() from super class.
   */
  levelUp(): void {
    this.maxHealth = Math.floor(Math.random() * 6) + 1;
    this.currentHealth = this.maxHealth;
    super.levelUp();
  }
}