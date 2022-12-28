import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-view-product",
  templateUrl: "./view-product.component.html",
  styleUrls: ["./view-product.component.css"],
})
export class ViewProductComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  editProductForm!: FormGroup;
  id: any;
  currentProduct: any;
  selectedImage: number = 0;
  modalToggle: string = "updateProduct";
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: any) => {
      this.id = data.productId;
    });
    this.getProducts();

    this.editProductForm = this.fb.group({
      name: [""],
      description: [""],
      price: [""],
    });
  }
  getProducts() {
    this.api.get(`/products/${this.id}`).subscribe({
      next: (data: any) => {
        console.log(data);
        this.currentProduct = data;
      },
      error: (data: any) => {
        console.log(data);
      },
    });
  }

  setEditValues() {
    this.modalToggle = "updateProduct";
    this.editProductForm.controls["name"].setValue(this.currentProduct.name);
    this.editProductForm.controls["description"].setValue(
      this.currentProduct.description
    );
    this.editProductForm.controls["price"].setValue(this.currentProduct.price);
  }

  selectImage(index: number) {
    this.selectedImage = index;
  }

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
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete("/products/", this.id).subscribe({
          next: (res) => {
            console.log("Delete Product : ", res);
            this.router.navigate(["/seller/products"]);
          },
          error: (err) => {
            console.log("Delete Product : ", err);
          },
        });
      }
    });
  }

  onFileSelect(event: any): void {}
  updateImages() {
    this.modalToggle = "updateImages";
    console.log("first");
  }
}
