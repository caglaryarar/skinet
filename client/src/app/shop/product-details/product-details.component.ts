import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product!:IProduct;
  
  constructor(private shopService:ShopService, private activatedRoute:ActivatedRoute,private bcService:BreadcrumbService) { 
    this.bcService.set('@productDetails', '');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct()
  {
    let paramId = this.activatedRoute.snapshot.paramMap.get('id');
    this.shopService.getProduct(Number(paramId)).subscribe(response => {
      this.product = response;
      this.bcService.set('@productDetails',this.product.name);
    },
    error => 
    {
      console.log(error);
    });
  }
}
