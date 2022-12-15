import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.getProducts();

    this.createProductForm = this.fb.group({
      name: [''],
      description: [''],
      images: [''],
      price: [''],
    });
  }

  files: any = [];
  products: any = [];
  productsImages: any = [];
  createProductForm!: FormGroup;
  basePrice: any = 1000;
  itemsPerPage: any = 3;
  page: any = 1;
  totalPage: any;
  query: any = `?page=${this.page}&limit=${this.itemsPerPage}`;

  getProducts() {
    this.query = `?page=${this.page}&limit=${this.itemsPerPage}`;
    this.api.get(`/products${this.query}`).subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res.results;
        this.setProductImages();
        this.totalPage = res.totalPages;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  setProductImages() {
    for (let i = 0; i < this.products.length; i++) {
      this.productsImages = this.products[i].images.url;
    }
    console.log(this.productsImages);
  }
  onFileSelect(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
  }

  submitProduct = () => {
    const formData = new FormData();
    formData.append('name', this.createProductForm.value.name);
    formData.append('description', this.createProductForm.value.description);
    for (let i = 0; i < this.files.length; i++) {
      formData.append('images', this.files[i]);
    }
    formData.append('price', this.createProductForm.value.price);

    this.api.post('/products', formData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.files = [];
        this.getProducts();
      },
      error: (err) => {
        console.log(err);
      },
    });
  };

  changeLimit(event: any) {
    console.log(event.target.value);
    this.itemsPerPage = event.target.value;
    this.getProducts();
  }
  next() {
    if (this.page < this.totalPage) {
      this.page += 1;
      this.getProducts();
    }
  }

  previous() {
    if (this.page > 1) {
      this.page -= 1;
      this.getProducts();
    } else {
    }
  }
}
