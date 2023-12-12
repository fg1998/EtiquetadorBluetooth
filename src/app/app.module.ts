import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import { SetupService } from './services/setup.service';





@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule, 
    ReactiveFormsModule, 
    IonicStorageModule.forRoot({name: '__mydb', driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]}), 
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, DatePipe, SetupService],
  bootstrap: [AppComponent]
})
export class AppModule {}
