import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent{

  
  constructor(@Inject(DOCUMENT) private document: Document, private userServices: UsersService, private router: Router) {
    const localStorage = document.defaultView?.localStorage;
  }
  
  login_form = new FormGroup({
    email: new FormControl<string | null>('',[
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string | null>('',[
      Validators.required,
      Validators.minLength(6)
    ])
  })

  login() {
    const formData = {
      email: this.login_form.value.email?.trim() ?? null,
      password: this.login_form.value.password?.trim() ?? null
    }

    this.userServices.login(formData.email,formData.password).subscribe((response) => {
      console.log("User Logged In", response)
      if (response[2].status_code === 302) {
        localStorage.setItem('loginToken',response[0])
        localStorage.setItem('userEmail', formData.email ?? '')
        localStorage.setItem('userName', response[1])
        this.router.navigateByUrl('/')
        setTimeout(() => {
          location.reload()
        }, 100);
      }
    })
  }

}
