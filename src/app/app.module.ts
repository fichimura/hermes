import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './ui/sidenav/sidenav.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidenavComponent,
    NavbarComponent,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
