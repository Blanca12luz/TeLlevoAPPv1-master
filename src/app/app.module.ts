import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore,provideFirestore } from '@angular/fire/firestore';

import { getAuth, provideAuth } from '@angular/fire/auth';
import { IonicStorageModule } from '@ionic/storage-angular';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    IonicStorageModule.forRoot() ,// Inicializa el módulo de almacenamiento
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [ [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"tellevoappv1-master","appId":"1:180376407977:web:5dd556c310adb16c6cbeb8","storageBucket":"tellevoappv1-master.firebasestorage.app","apiKey":"AIzaSyDYEx-mRFp5IPt9pN-fnu8JVf3ZTMZ644M","authDomain":"tellevoappv1-master.firebaseapp.com","messagingSenderId":"180376407977","measurementId":"G-ELEGTD7W75"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],],
  bootstrap: [AppComponent],
})
export class AppModule {}

