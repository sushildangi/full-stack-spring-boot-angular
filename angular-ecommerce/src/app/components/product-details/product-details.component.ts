import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/common/product";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"],
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.handleProductDetails();
    });
  }
  handleProductDetails() {
    // get the 'id' param string. convert string to number using the '+' symbol
    const theProductId = +this.route.snapshot.paramMap.get("id");
    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
    });
  }
}
