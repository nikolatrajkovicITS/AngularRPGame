import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './components/start/start.component';
import { StoryComponent } from './components/story/story.component';
import { CharacterCreationComponent } from './components/character-creation/character-creation.component';
import { FightComponent } from './components/fight/fight.component';

const routes: Routes = [
  { path: "", component: StartComponent },
  { path: "story", component: StoryComponent },
  { path: "character-creation", component: CharacterCreationComponent },
  { path: "fight", component: FightComponent },
  { path: "**", redirectTo: "" }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}