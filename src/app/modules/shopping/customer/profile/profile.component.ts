import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  modalTitle: string = 'Update Profile';
  savedAddresses: any = [];
  editAddressId: any;
  showSaveAddresses: boolean = false;
  updateProfileForm!: FormGroup;
  addAddressForm!: FormGroup;
  selectedImage: any;
  previewImage: any;
  addPictureForm!: FormGroup;

  constructor(
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  userData: any = {};
  ngOnInit(): void {
    console.log(this.showSaveAddresses);
    this.getProfile();
    this.updateProfileForm = this.fb.group({
      name: [''],
      email: [''],
    });
    this.addAddressForm = this.fb.group({
      street: [''],
      addressLine2: [''],
      city: [''],
      state: [''],
      pin: [''],
    });
    this.addPictureForm = this.fb.group({
      picture: [''],
    });
  }
  getProfile() {
    this.api.get('/shop/auth/self').subscribe({
      next: (res) => {
        console.log(res);
        this.userData = res;
      },
      error: (err) => {
        console.log(err);
        alert('Error');
      },
    });
  }

  editPictureModal() {
    this.modalTitle = 'Update Image';
  }
  onFileSelect(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e: any) => {
      this.previewImage = e.target.result;
    };
    this.selectedImage = event.target.files[0];
  }
  submitImage() {
    const formData = new FormData();
    formData.append('picture', this.selectedImage);
    console.log(formData);

    this.api.post('/customers/profile-picture', formData).subscribe({
      next: (res) => {
        console.log(res);
        this.getProfile();
        // formData.delete;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteProfilePicture() {
    this.api.delete('/customers/profile-picture', '').subscribe({
      next: (res) => {
        console.log(res);
        this.getProfile();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editProfileModal() {
    this.modalTitle = 'Update Profile';
    this.updateProfileForm.controls['name'].setValue(this.userData.name);
    this.updateProfileForm.controls['email'].setValue(this.userData.email);
  }
  addAddressModal() {
    this.modalTitle = 'Add Address';
  }

  submitProfileUpdate() {
    this.modalTitle = 'Update Profile';
    console.log(this.userData._id);
    this.api
      .patch('/customers/update-profile', '', this.updateProfileForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Suceesfully Updated!',
            showConfirmButton: false,
            timer: 1500,
          });
          this.getProfile();
          this.modalTitle = 'Add Address';
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  submitAddAddress() {
    console.log(this.addAddressForm.value);
    this.api.post('/customers/address', this.addAddressForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.getAddresses();
        alert('Added!');
        this.addAddressForm.reset();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAddresses() {
    if (this.showSaveAddresses) {
      this.showSaveAddresses = false;
    } else {
      this.showSaveAddresses = true;
    }
    console.log(this.showSaveAddresses);
    this.api.get('/customers/address').subscribe({
      next: (res) => {
        console.log(res);
        this.savedAddresses = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  /**
   * It takes the id and index of the address to be edited and sets the form values to the values of
   * the address to be edited
   * @param {any} id - The id of the address that is to be edited.
   * @param {any} index - The index of the address in the array of addresses.
   */
  getIdAddress(id: any, index: any) {
    console.log(index, id);
    this.editAddressId = id;
    this.modalTitle = 'Edit Address';
    this.addAddressForm.controls['street'].setValue(
      this.savedAddresses[index]?.street
    );
    this.addAddressForm.controls['addressLine2'].setValue(
      this.savedAddresses[index]?.addressLine2
    );
    this.addAddressForm.controls['city'].setValue(
      this.savedAddresses[index]?.city
    );
    this.addAddressForm.controls['state'].setValue(
      this.savedAddresses[index]?.state
    );
    this.addAddressForm.controls['pin'].setValue(
      this.savedAddresses[index]?.pin
    );
  }

  // Submitting an Updated address
  submitEditAddress() {
    this.api
      .put('/customers/address', this.editAddressId, this.addAddressForm)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.getAddresses();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Suceesfully Updated!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  // To delete an Address
  deleteAddress(id: any) {
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete('/customers/address/', this.editAddressId).subscribe({
          next: (res) => {
            console.log(res);

            this.getAddresses();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  /**
   * It's a function that deletes a customer's account
   */
  deleteCustomer() {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete account!',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.userData._id);
        // this.api.delete("/customers/account", this.userData._id).subscribe({
        //   next: (res) => {
        //     console.log(res);
        //   },
        //   error: (err) => {
        //     console.log(err);
        //   },
        // });
      }
    });
  }
}
