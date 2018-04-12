import { Hero } from "../hero/hero";
import { RaceOptions } from "./race-options";

/**
 * Level Experience          
 */
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

/**
 * Switches off of the hearoes
 * race increases or decreases 
 * their skills depending on
 * that.
 */
export const checkRace = (hero: Hero) => {
  switch (hero.race) {
    case RaceOptions.human:
      hero.skills.persuade +=2;
      hero.skills.intelligence++;
      hero.skills.sneak -= 2;
      break;
    case RaceOptions.elf:
      hero.skills.intelligence += 2;
      hero.skills.sneak++;
      hero.skills.persuade -= 2;
      break;
    case RaceOptions.dwarf: 
      hero.skills.attack += 2;
      hero.skills.persuade++;
      hero.skills.intelligence -= 2;
      break;
    case RaceOptions.halfling:
      hero.skills.sneak += 2;
      hero.skills.attack++;
      hero.skills.persuade -= 2;
      break;
    default: 
      break;
  }
}