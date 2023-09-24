import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditComponent } from './component/credit/credit.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { StatistiqueComponent } from './component/statistique/statistique.component';
import { AuthGuardService } from './services/auth.gard.service';

const routes: Routes = [
  { path: 'credits', component: CreditComponent, canActivate: [AuthGuardService] }, 
  { path: 'statistiques', component: StatistiqueComponent, canActivate: [AuthGuardService] },
  { path: '', component: HomePageComponent, canActivate: [AuthGuardService] }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
