
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app.routes';  // Importando o módulo de rotas

// Importando os componentes
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PasswordMatchDirective } from './password-match.directive';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    RegisterComponent,
    LoginComponent,
    PasswordMatchDirective  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // Usando o módulo de rotas
    HttpClient
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
