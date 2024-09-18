import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent implements OnInit {

  email!: string
  showInfoForm: boolean = true
  showEmailForm!: boolean
  showDeleteForm!: boolean

  constructor(private userServices: UsersService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    let localStorage = this.document.defaultView?.localStorage
    this.email = localStorage?.getItem('userEmail')!
  }

  update_form = new FormGroup({
    newName: new FormControl<string>('', [
      Validators.required
    ]),
    newPassword: new FormControl<string>('', [
      Validators.required
    ]),
    currentPassword: new FormControl<string>('', [
      Validators.required
    ])
  })

  updateInfo() {
    this.userServices.updateInfo(this.email, this.update_form.controls.newName.value!, this.update_form.controls.newPassword.value!, this.update_form.controls.currentPassword.value!).subscribe(response => {
      console.log(response);
    })
  }

  update_Email = new FormGroup({
    newEmail: new FormControl<string>('', [
      Validators.required
    ]),
    password: new FormControl<string>('', [
      Validators.required
    ])
  })

  updateEmail() {
    this.userServices.updateEmail(this.email, this.update_Email.controls.newEmail.value!, this.update_Email.controls.password.value!).subscribe(response => {
      console.log(response);
    })
  }

  delete_User = new FormGroup({
    password: new FormControl<string>('', [
      Validators.required
    ])
  })

  showBox: boolean = false

  deleteSure(e: Event) {
    let target = e.target as HTMLButtonElement
    if (target.innerText === 'Yes') {
      console.log(target.innerText);
      this.userServices.deleteUser(this.email, this.delete_User.controls.password.value!).subscribe(response => {
        console.log(response);
        this.showBox = false
        this.delete_User.controls.password.setValue('')
      })
    }
    else if (target.innerText === 'No') {
      console.log(target.innerText);
      this.showBox = false
      this.delete_User.controls.password.setValue('')
    }
  }

  deleteUser(e: Event) {
    e.preventDefault()
    if (this.delete_User.controls.password.value) {
      this.showBox = true
    }
  }

  getform(e: Event) {
    let target = (e.target as HTMLParagraphElement).innerText
    console.log(target);

    if (target === 'Update Info') {
      this.showInfoForm = true
      this.showEmailForm = false
      this.showDeleteForm = false
    }
    else if (target === 'Update Email') {
      this.showEmailForm = true
      this.showInfoForm = false
      this.showDeleteForm = false
    }
    else {
      this.showDeleteForm = true
      this.showInfoForm = false
      this.showEmailForm = false
    }
  }

  @HostListener("document:click",['$event'])
  documentClick(e: MouseEvent) {
    let target = e.target as HTMLElement

    if (!target.classList.contains('.sureBox')) {
      this.showBox = false
    }
  }

}
