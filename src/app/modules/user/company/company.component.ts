import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  users: any = [];
  createUserForm!: FormGroup;
  todayDate = new Date();

  ngOnInit(): void {
    this.getUser();
    this.createUserForm = this.fb.group({
      name: [''],
      email: [''],
      role: [''],
      password: [''],
    });
  }

  getUser() {
    this.api.get('/users').subscribe({
      next: (res: any) => {
        console.log(res);
        this.users = res.results;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleCreate() {
    console.log(this.createUserForm.value);
    this.api.post('/users', this.createUserForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        alert('Create Success!');
        this.getUser();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  handleDelete(id: any) {
    console.log(id);
    // this.api.delete('/users/', id).subscribe({
    //   next: (res) => {
    //     console.log('Delete : ' + res);
    //     alert('Delete Success!');
    //     this.getUser();
    //   },
    //   error: (err) => {
    //     console.log('Delete : ' + err);
    //   },
    // });
  }
  handleupdate(user: any) {
    console.log(user);
    // this.createUserForm.removeControl('role');
    this.createUserForm.controls['name'].setValue(user.name);
    this.createUserForm.controls['email'].setValue(user.email);
  }
}
