import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactCreateComponent } from './components/contact-create/contact-create.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCreateComponent } from './components/user-create/user-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/contatos', pathMatch: 'full' },
  { path: 'contatos/incluir', component: ContactCreateComponent },
  { path: 'contatos', component: ContactListComponent },
  { path: 'usuarios/incluir', component: UserCreateComponent },
  { path: 'usuarios', component: UserListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
