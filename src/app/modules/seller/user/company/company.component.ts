import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  [x: string]: any;
  constructor(
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private shared: SharedService
  ) {}

  users: any = [];
  createUserForm!: FormGroup;
  todayDate = new Date();
  modalId: string = 'createUser';
  modalTitle: string = 'Create User';
  userIdUpdate!: string;
  loggedUser: any;
  page: any = 1;
  itemPerPage: any = 5;
  totalResults: any;
  // query: any = `?&page=${this.page}&limit=${this.itemPerPage}`;
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
    this.api.get(`/users`).subscribe({
      next: (res: any) => {
        console.log(res);
        this.users = res.results;
        this.totalResults = res.totalResults;
        this.itemPerPage = res.limit;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleCreate() {
    this.modalId = 'createUser';
    console.log(this.createUserForm.value);
    this.api.post('/users', this.createUserForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        alert('Create Success!');
        this.getUser();
        this.createUserForm.reset();
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
  handleModal() {
    this.modalTitle = 'Create User';
    if (this.modalId === 'updateUser || updateRole') {
      this.modalId = 'createUser';
      // this.modalTitle = 'Create User';
    } else {
      this.modalId = 'createUser';
    }
  }

  getUserRole(user: any) {
    this.modalId = 'updateRole';
    this.modalTitle = 'Update Role';
    this.userIdUpdate = user?._id;
  }
  getUserUpdate(user: any) {
    this.modalTitle = 'Update User';
    this.modalId = 'updateUser';
    this.createUserForm.controls['name'].setValue(user.name);
    this.createUserForm.controls['email'].setValue(user.email);
    this.createUserForm.controls['password'].setValue('');
    delete this.createUserForm.value.role;
    console.log(this.createUserForm.value);
    this.userIdUpdate = user?._id;
    console.log(this.userIdUpdate);
  }
  handleRoleUpdate() {
    delete this.createUserForm.value.name;
    delete this.createUserForm.value.email;
    delete this.createUserForm.value.password;
    this.api
      .patch(`/users/role/`, this.userIdUpdate, this.createUserForm.value)
      .subscribe({
        next: (res) => {
          this.createUserForm.reset();
          this.getUser();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  handleUpdate() {
    delete this.createUserForm.value.role;
    this.api
      .patch('/users/', this.userIdUpdate, this.createUserForm.value)
      .subscribe({
        next: (res) => {
          this.createUserForm.reset();
          this.getUser();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  handlePageChange(e: any) {
    console.log(e);
    this.api.get(`/users?page=${e}&limit=${this.itemPerPage}`)
    .subscribe({
      next: (res: any) => {
        console.log(res);
        this.users = res.results;
        this.page = res.page;
        this.totalResults = res.totalResults;
        this.itemPerPage = res.limit;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handlePageSizeChange(event: any) {
    console.log(event);
  }
}
