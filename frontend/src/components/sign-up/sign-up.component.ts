import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms'
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  constructor(private userServices: UsersService , private router: Router) {}
   
  signUp_Form = new FormGroup({
    email: new FormControl<string | null>('',[
      Validators.required,
      Validators.email,
    ]),
    name: new FormControl<string | null>('',[
      Validators.required
    ]),
    password: new FormControl<string | null>('',[
      Validators.required,
      Validators.minLength(6)
    ])
  })

  signUp() {
    const formData = {
      name: this.signUp_Form.value.name?.trim() ?? null,
      email: this.signUp_Form.value.email?.trim() ?? null,
      password: this.signUp_Form.value.password?.trim() ?? null
    }

    this.userServices.signUp(formData).subscribe((response) => {
      if (response.status_code === 201) {
        console.log("User Created",response)
        this.router.navigateByUrl('/')
      }
    }
    )
  }



}
