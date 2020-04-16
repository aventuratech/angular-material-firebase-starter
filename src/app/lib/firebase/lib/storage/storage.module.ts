import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './lib/upload/upload.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [UploadComponent],
  exports: [UploadComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatProgressBarModule
  ]
})
export class StorageModule { }
