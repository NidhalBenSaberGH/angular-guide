import {UsersComponent} from "./users/users.component";
import {ServersComponent} from "./servers/servers.component";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {UserComponent} from "./users/user/user.component";

const appRoutes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent},
  {path: 'users/:id/:name', component: UserComponent},
  {path: 'servers', component: ServersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
