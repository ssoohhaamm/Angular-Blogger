import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule , Validators } from '@angular/forms';
import { MustMatch } from '../../helper/must-match.validator';
import { UsersService } from '../../services/users.service';
import { CommonService } from '../../services/common.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  registerForm: FormGroup;
	submitted = false;
	isLogged = false;
	userDetail :any;
	userid = "";
	username;
  constructor(private formBuilder: FormBuilder,private usersService: UsersService,private  commonService: CommonService, private router: Router) { }

  ngOnInit() {
  	this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        name: ['', Validators.required],
        password: ['', Validators.required]
    });
    if(this.commonService.userDetails != undefined && this.commonService.userDetails["username"] != "" && this.commonService.userDetails["username"] != null)
    {
      this.isLogged = this.commonService.userDetails["isLogged"];
      this.username=this.commonService.userDetails["username"];
		this.usersService.getUsersDetail(this.username)
    	.subscribe(data => {
    		this.userDetail = data["items"][0];
    		this.userid=this.commonService.userDetails["userId"];
    		this.registerForm.controls["username"].setValue(this.userDetail["username"]);
    		this.registerForm.controls["name"].setValue(this.userDetail["name"]);
    		this.registerForm.controls["password"].setValue(this.userDetail["password"]);
    	});    
    }    
  }

  onSubmit(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        var profile = {
          "username":this.registerForm.value["username"],
          "name":this.registerForm.value["name"],
          "password":this.registerForm.value["password"]
        }
        
        
        this.usersService.editProfile(this.userid,profile);
        setTimeout(()=>{
          this.router.navigate(['/']);
        },300);
        // display form values on success
        // this.loaded = false;
        
  }

  removeAccount(id){
    this.usersService.removeProfile(id);
    this.commonService.remove();
    setTimeout(()=>{
        this.router.navigate(['/']);
      },300);
  }

   get f() { return this.registerForm.controls; }

}
