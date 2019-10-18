import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllblogsComponent } from './allblogs/allblogs.component';
import { LoginComponent } from './login/login.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilteredComponent } from './filtered/filtered.component';

const routes: Routes = [
	{
	    path: 'home',
	    component: AllblogsComponent
	},
	{
	    path: 'filteredTag',
	    component: FilteredComponent
	},

	{
	    path: 'myblogs',
	    component: MyblogsComponent
	},
	{
	    path: 'edit-profile',
	    component: DashboardComponent
	},
	{
	    path: 'create-blog',
	    component: CreateBlogComponent
	},
	{
	    path: 'login',
	    component: LoginComponent
	},
	{
	    path: 'blog-detail',
	    component: BlogDetailComponent
	},
	{ 
		path: '',
    	redirectTo: '/home',
    	pathMatch: 'full'
  	}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
