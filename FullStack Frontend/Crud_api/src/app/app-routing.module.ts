import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { TableViewComponent } from './pages/table-view/table-view/table-view.component';

const routes: Routes = [
  { path: 'dashboard', component: DashComponent },
  { path: 'table', component: TableViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
