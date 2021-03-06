import { Component, AfterViewInit, EventEmitter } from '@angular/core'; 
 import { NgForm } from '@angular/forms'; 
 import { AuthService } from '../auth.service'; 
 
 @Component({ 
     templateUrl: './signup.component.html', 
     styleUrls: ['./signup.component.css'] 
 }) 
 export class SignupComponent { 
     isLoading = false; 
 
 
     //public focusSetting = new EventEmitter<boolean>(); 
     constructor(public authService: AuthService) { } 
 

     /*ngAfterViewInit() {  
         this.focusSetting.emit(true); 
     } */
 

     onSignup(form: NgForm) { 
         if (form.invalid) { 
             return; 
         } 
         this.authService.createUser(form.value.email, form.value.password); 
     } 
 } 
