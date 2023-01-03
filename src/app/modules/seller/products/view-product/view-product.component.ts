import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  editProductForm!: FormGroup;
  updateImagesForm!: FormGroup;
  id: any;
  currentProduct: any;
  previewImages: any = [];
  selectedImages: any = [];
  deleteImageIds: any = [];
  uniqueSet: any = [];
  copyImages: any = [];
  modalToggle: string = 'updateProduct';

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: any) => {
      this.id = data.productId;
    });

    this.getProducts();

    this.editProductForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
    });
    this.updateImagesForm = this.fb.group({
      new_images: [''],
      delete: [],
    });
  }
  getProducts() {
    this.api.get(`/products/${this.id}`).subscribe({
      next: (data: any) => {
        console.log(data);
        this.currentProduct = data;
        this.copyImages = [...this.currentProduct.images];
      },
      error: (data: any) => {
        console.log(data);
      },
    });
  }

  setEditValues() {
    this.modalToggle = 'updateProduct';
    this.editProductForm.controls['name'].setValue(this.currentProduct.name);
    this.editProductForm.controls['description'].setValue(
      this.currentProduct.description
    );
    this.editProductForm.controls['price'].setValue(this.currentProduct.price);
  }

  selectImage(index: number) {}

  submitUpdateProduct() {
    this.api
      .patch(`/products/`, this.currentProduct._id, this.editProductForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getProducts();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteProduct() {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete('/products/', this.id).subscribe({
          next: (res) => {
            console.log('Delete Product : ', res);
            this.router.navigate(['/seller/products']);
          },
          error: (err) => {
            console.log('Delete Product : ', err);
          },
        });
      }
    });
  }

  onFileSelect(event: any): void {
    this.selectedImages = event.target.files;
    for (let i = 0; i < this.selectedImages.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      reader.onload = (e: any) => {
        console.log(e.target.result);
        this.previewImages[i] = e.target.result;
      };
    }
  }

  removeImages(imageId: any, index: number) {
    this.deleteImageIds.push(imageId);
    this.uniqueSet = [...new Set(this.deleteImageIds)];
    console.log(this.uniqueSet);
    this.copyImages[index] = '';
  }
  updateImagesToggle() {
    this.modalToggle = 'Update Images';
    this.getProducts();
  }

  updateImages(ProductId: any) {
    console.log(ProductId);
    const formData = new FormData();

    /* Appending the images to the formData. */
    for (let i = 0; i < this.selectedImages.length; i++) {
      formData.append('new_images', this.selectedImages[i]);
    }
    for (let i = 0; i < this.deleteImageIds.length; i++) {
      formData.append('delete', this.deleteImageIds[i]);
    }

    /* Updating the images of the product. */
    this.api.patch('/products/images/', ProductId, formData).subscribe({
      next: (res) => {
        console.log(res);

        this.getProducts();

        alert('Success!');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
