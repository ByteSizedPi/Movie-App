import { MoviePlayerComponent } from "./views/movie-player/movie-player.component";
import { UserComponent } from "./views/user/user.component";
import { HomeComponent } from "./views/home/home.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./views/login/login.component";
import { AuthGuardService } from "./shared/services/auth-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "home", canActivate: [AuthGuardService], component: HomeComponent },
  { path: "user", canActivate: [AuthGuardService], component: UserComponent },
  { path: "watch", component: MoviePlayerComponent },
  // { path: 'player', component: MoviePlayerComponent },

  // {
  //   path: 'main', canActivate: [AuthGuardService], component: MainComponent, children: [
  //     { path: 'self', component: SelfAppraisalComponent },
  //     { path: 'employee', component: EmployeeAppraisalComponent },
  //     { path: 'other', component: OtherComponent },
  //   ]
  // },
  // { path: 'new', canActivate: [AuthGuardService], component: AppraisalComponent },
  // { path: 'newEmployee', canActivate: [AuthGuardService], component: NewEmployeeComponent },
  // { path: 'newTemplate', canActivate: [AuthGuardService], component: NewTemplateComponent },
  // { path: 'appraisals', component: AppraisalListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
