import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { RegisterComponent } from './public/register/register.component';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { AuthService } from './shared/services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SnackBarService } from './shared/services/snackbar.service';
import { LoginComponent } from './public/login/login.component';
import { HomeComponent } from './private/home/home.component';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { DraftingComponent } from './private/drafting/drafting.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TimelineComponent } from './private/timeline/timeline.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProfilComponent } from './private/profil/profil.component';
import {MatDialogModule} from '@angular/material/dialog';
import { RemoveDialogComponent } from './shared/components/remove-dialog/remove-dialog.component';
import { EditDialogComponent } from './shared/components/edit-dialog/edit-dialog.component';
import { FileUploadComponent } from './shared/components/file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    DraftingComponent,
    TimelineComponent,
    ProfilComponent,
    RemoveDialogComponent,
    EditDialogComponent,
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  providers: [AuthService,
     SnackBarService,
     {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
