import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { AuthEffects } from './auth/state/auth.effects';
import { appReducer } from './state/app.reducer';
import { AuthInterceptor } from './shared/services/auth-token.interceptors';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './state/router/custom-serializer';

@NgModule({
    declarations: [AppComponent, HomeComponent, HeaderComponent, LoadingSpinnerComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        EffectsModule.forRoot([AuthEffects]),
        StoreModule.forRoot(appReducer, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
                strictStateSerializability: false,
                strictActionSerializability: false,
                strictActionTypeUniqueness: true
            }
        }),
        StoreDevtoolsModule.instrument(),
        StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer })
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule {}
