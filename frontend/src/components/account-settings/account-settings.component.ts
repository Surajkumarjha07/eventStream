import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UpdateInfoService } from '../../services/updateInfo/update-info.service';
import { CommonModule, DOCUMENT } from '@angular/common';
import { UpdateEmailService } from '../../services/updateEmail/update-email.service';
import { DeleteUserService } from '../../services/deleteUser/delete-user.service';

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

  constructor(private updateInfoService: UpdateInfoService, private updateEmailService: UpdateEmailService, private deleteUserService: DeleteUserService, @Inject(DOCUMENT) private document: Document) { }

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
    this.updateInfoService.updateInfo(this.email, this.update_form.controls.newName.value!, this.update_form.controls.newPassword.value!, this.update_form.controls.currentPassword.value!).subscribe(response => {
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
    this.updateEmailService.updateEmail(this.email, this.update_Email.controls.newEmail.value!, this.update_Email.controls.password.value!).subscribe(response => {
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
      this.deleteUserService.deleteUser(this.email, this.delete_User.controls.password.value!).subscribe(response => {
        console.log(response);
        this.showBox = false
        this.delete_User.controls.password.setValue('')
      })
    }
    else if (target.innerText === 'No') {
      console.log(target.innerText);
      alert('Not allowed')
      this.showBox = false
      this.delete_User.controls.password.setValue('')
    }
  }

  deleteUser(e: Event) {
    e.preventDefault()
    this.showBox = true
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

}
