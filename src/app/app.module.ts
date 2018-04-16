import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './components/app.component';
import { CharacterCreationComponent } from './components/character-creation/character-creation.component';
import { FightComponent } from './components/fight/fight.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { StartComponent } from './components/start/start.component';
import { StoryComponent } from './components/story/story.component';
import { AppRoutingModule } from './app-routing.module';
import { GameControllerService } from './services/game-controller.service';


@NgModule({
  declarations: [
    AppComponent,
    CharacterCreationComponent,
    FightComponent,
    InventoryComponent,
    StartComponent,
    StoryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    GameControllerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
