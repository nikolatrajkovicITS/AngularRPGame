import { Hero } from "./hero";
import { ClassOptions } from "../character/class-options";
import { GenderOptions } from '../character/gender-options';


export class Rogue extends Hero {
  constructor(name, gender, race, level, health, skills, weapon, armor) { 
    super(name, gender, race, level, health, skills, weapon, armor);

    this.characterRole = ClassOptions.warrior;
    this.skills.sneak += 2;
    this.skills.attack++;
    this.skills.persuade--;
    this.skills.intelligence--;
    this.spriteUrl = this.gender === GenderOptions.male ? "./assets/images/rogue-male.png" 
      : "./assets/images/rogue-female.png";
  }

  /**
   * 1.Increase the health
   * 2.Reset the health
   * 3.Then go through experieance 
   * levelUp() from super class.
   */
  levelUp(): void {
    this.maxHealth = Math.floor(Math.random() * 10) + 1;
    this.currentHealth = this.maxHealth;
    super.levelUp();
  }
}