import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthModule} from './lib/auth/auth.module';
import {FirestoreModule} from './lib/firestore/firestore.module';
import {StorageModule} from './lib/storage/storage.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    FirestoreModule,
    StorageModule
  ]
})
export class FirebaseModule { }
