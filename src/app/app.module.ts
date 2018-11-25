import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// ROUTER
import { appRouting } from "./app-routing";

// ICONS
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

// COMPONENTS
import { AppComponent } from './app.component';
import { CreditsComponent } from './pages/credits/credits.component';
import { GameComponent } from './pages/game/game.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { GridComponent } from './components/grid/grid.component';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';
import { OptionsComponent } from './pages/options/options.component';



@NgModule({
  declarations: [
    AppComponent,
    CreditsComponent,
    GameComponent,
    CanvasComponent,
    GridComponent,
    MainMenuComponent,
    OptionsComponent,
  ],
  imports: [
    BrowserModule,
    appRouting,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
