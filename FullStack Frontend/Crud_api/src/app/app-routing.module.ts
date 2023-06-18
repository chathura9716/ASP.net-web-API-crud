import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { TableViewComponent } from './pages/table-view/table-view/table-view.component';
import { LoyalCustViewPageComponent } from './pages/loyalty_customer_management/loyal-cust-view-page/loyal-cust-view-page.component';

const routes: Routes = [
  { path: 'dashboard', component: DashComponent },
  { path: 'table', component: TableViewComponent },
  { path: 'LoyalCustomers', component: LoyalCustViewPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
