import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule  } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllblogsComponent } from './allblogs/allblogs.component';
import { CommonService } from '../services/common.service';
import { ApiService } from '../services/api.service';
import { BlogsService } from '../services/blogs.service';
import { UsersService } from '../services/users.service';
import { CommentsService } from '../services/comments.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FilteredComponent } from './filtered/filtered.component';



@NgModule({
  declarations: [
    AppComponent,
    AllblogsComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    BlogDetailComponent,
    MyblogsComponent,
    CreateBlogComponent,
    SidebarComponent,
    FilteredComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule 
  ],
  providers: [CommonService,ApiService,BlogsService,UsersService,CommentsService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
