import { Routes,RouterModule} from "@angular/router";
// Pages
import { MainMenuComponent } from "./pages/main-menu/main-menu.component";
import { GameComponent } from "./pages/game/game.component";
import { OptionsComponent } from "./pages/options/options.component";
import { CreditsComponent } from "./pages/credits/credits.component";

const appRoutes: Routes = [ 
    {path:'',component:MainMenuComponent},
    {path:'juego',component:GameComponent},
    {path:'opciones',component:OptionsComponent},
    {path:'creditos',component:CreditsComponent},
];

export const appRouting = RouterModule.forRoot(appRoutes);