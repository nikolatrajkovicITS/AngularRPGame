import { ClassOptions } from "./class-options";
import { RaceOptions } from "./race-options";
import { GenderOptions } from "./gender-options";

export const CharacterOptions = {
  races: [
    RaceOptions.human,
    RaceOptions.dwarf,
    RaceOptions.elf,
    RaceOptions.halfling
  ],
  classes: [
    ClassOptions.warrior,
    ClassOptions.ranger,
    ClassOptions.rouge,
    ClassOptions.priest
  ],
  genders: [
    GenderOptions.male,
    GenderOptions.female
  ]
}