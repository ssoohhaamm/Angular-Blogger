import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule , Validators } from '@angular/forms';
import { MustMatch } from '../../helper/must-match.validator';
import { UsersService } from '../../services/users.service';
import { CommonService } from '../../services/common.service';
import { Router } from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	registerForm: FormGroup;
	loginForm: FormGroup;
    submitted = false;
    submittedLogin = false;
    allUsers : any;
    found = true;
    avatar = "https://s3.amazonaws.com/uifaces/faces/twitter/idiot/128.jpg";
  constructor(private formBuilder: FormBuilder,private usersService: UsersService,private  commonService: CommonService, private router: Router) { }

  ngOnInit() {
  	this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        name: ['', Validators.required],
        password: ['', Validators.required]
    });
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  	$(function() {

	    $('#login-form-link').click(function(e) {
			$("#login-form").delay(100).fadeIn(100);
	 		$("#register-form").fadeOut(100);
			$('#register-form-link').removeClass('active');
			$(this).addClass('active');
			e.preventDefault();
		});
		$('#register-form-link').click(function(e) {
			$("#register-form").delay(100).fadeIn(100);
	 		$("#login-form").fadeOut(100);
			$('#login-form-link').removeClass('active');
			$(this).addClass('active');
			e.preventDefault();
		});

	});
  }

   onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        // display form values on success
        var userData = {
          "createdAt": new Date(),
          "username":this.registerForm.value["username"],
           "avatar": this.avatar,
           "name": this.registerForm.value["name"],
           "password": this.registerForm.value["password"]
        }
        this.usersService.register(userData);
        setTimeout(()=>{
          this.router.navigate(['/']);
        },300);
    }

    onLogin() {
        this.submittedLogin = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        // display form values on success
        this.usersService.get()
	    .subscribe(data => {
	    	this.allUsers = data["items"];
	    	setTimeout(()=>{
			    if(this.allUsers != undefined && this.allUsers != null && this.allUsers != "")
			    {
			    	
			    	for (var i = 0; i < this.allUsers.length; ++i) {
				    	
			    		if(this.allUsers[i]["username"] == this.loginForm.value.username && this.allUsers[i]["password"] == this.loginForm.value.password)
			    		{
			    			this.found = true;
			    			this.commonService.set(this.allUsers[i]);
			    			break;			    			
			    		}
			    		else
			    		{
			    			this.found = false;
			    		}
			    	}
			    }
	    	},300);
		    
	    });
        // console.log(this.usersService.get());
    }

    get f() { return this.registerForm.controls; }
    get f2() { return this.loginForm.controls; }
   
}
