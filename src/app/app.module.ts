import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './ui/sidenav/sidenav.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './pages/user/user.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidenavComponent,
    NavbarComponent,
    UserComponent,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
