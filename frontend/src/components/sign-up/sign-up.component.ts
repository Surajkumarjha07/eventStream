import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms'
import { SignUpService } from '../../services/signUp/sign-up.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  constructor(private signUpService: SignUpService, private router: Router) {}
   
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
      name: this.signUp_Form.value.name ?? null,
      email: this.signUp_Form.value.email ?? null,
      password: this.signUp_Form.value.password ?? null
    }

    this.signUpService.sendData(formData).subscribe((response) => {
      if (response.status_code === 201) {
        console.log("User Created",response)
        this.router.navigateByUrl('/')
      }
    }
    )
  }



}
