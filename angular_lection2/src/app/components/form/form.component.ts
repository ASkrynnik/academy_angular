import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  newUserForm: FormGroup = {} as FormGroup;
  users!: User[];

  constructor(private fb: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.apiService.getUsers().subscribe(users => this.users = users);
  }

  initializeForm(): void {
    this.newUserForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
    })
  }

  get f() { return this.newUserForm.controls }

  onSubmit() {
    if (this.newUserForm.valid) {
      const newUser = {
        id: this.users.length + 1,
        name: `${this.newUserForm.value.firstname} ${this.newUserForm.value.lastname}`,
        email: this.newUserForm.value.email,
        phone: this.newUserForm.value.phone
      }
      this.apiService.addUser(newUser);
      this.newUserForm.reset();
    }
  }

}
