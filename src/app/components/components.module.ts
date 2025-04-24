import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { NavbarComponent }    from './navbar/app-navbar.component';
import { TableComponent }     from './table/table.component';

@NgModule({
  declarations: [
    NavbarComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    TableComponent
  ]
})
export class ComponentsModule {}