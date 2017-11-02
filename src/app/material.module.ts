import { NgModule } from '@angular/core';

import {

  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatGridListModule

} from '@angular/material';

@NgModule({

  imports: [

    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule

  ],

  exports: [

    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule

  ]

})

export class MaterialModule {}
