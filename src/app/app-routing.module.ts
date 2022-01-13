import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChesscomProfileComponent } from './chesscom-profile/chesscom-profile.component';
import { UsernameResolver } from './chesscom-profile/username.resolver';

const routes: Routes = [
  {
    path: 'chess.com/:username',
    component: ChesscomProfileComponent,
    resolve:
    {
      username: UsernameResolver
    }
  },
  {
    path: ':username',
    // component: ChesscomProfileComponent,
    // resolve:
    // {
    //   username: UsernameResolver
    // },
    redirectTo: 'chess.com/:username'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
