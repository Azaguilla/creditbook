import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditComponent } from './component/credit/credit.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { StatistiqueComponent } from './component/statistique/statistique.component';

const routes: Routes = [
  { path: 'credits', component: CreditComponent }, 
  { path: 'statistiques', component: StatistiqueComponent },
  { path: '', component: HomePageComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
