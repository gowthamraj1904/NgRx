import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    declarations: [LoginComponent, SignupComponent],
    imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule, EffectsModule.forFeature()]
})
export class AuthModule {}
