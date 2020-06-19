import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SucessBoxComponent } from '../sucess-box/sucess-box.component';
@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  public allProducts: any;
  public count = 0;
  public productAddedTocart = [];
  public totalCost = 0;
  public totalQuantity = 0;

  async ngOnInit() {
    localStorage.removeItem('product');
    this.getLocalData();

  }

  getLocalData() {
    const self = this;
    //during runtime
    // const myRequest = new Request('/assets/js/products.json');
    // during production
    const myRequest = new Request('cart-application/assets/js/products.json');
    fetch(myRequest)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        self.appendData(data);
      })
      .catch(function (err) {
      });
  }
  appendData(data) {
    this.allProducts = data;
  }

  addCart(product) {
    this.productAddedTocart = JSON.parse(localStorage.getItem('product'));
    if (this.productAddedTocart == null) {
      this.productAddedTocart = [];
      product.count++;
      this.productAddedTocart.push(product);
      localStorage.setItem('product', JSON.stringify(this.productAddedTocart));
    }
    else {
      let tempProduct = this.productAddedTocart.find(p => p.id == product.id);
      if (tempProduct == null) {
        product.count++;
        this.productAddedTocart.push(product);
        localStorage.setItem('product', JSON.stringify(this.productAddedTocart));
      }
      else {
        this.productAddedTocart = JSON.parse(localStorage.getItem('product'));
        product.count++;
        this.productAddedTocart.find(p => p.id == product.id).count + 1;
        this.productAddedTocart.find(p => p.id == product.id).count++
        localStorage.setItem("product", JSON.stringify(this.productAddedTocart));
      }
    }
    this.calculateTotalCost(this.productAddedTocart);
  }

  onAddQuantity(product) {
    this.productAddedTocart = JSON.parse(localStorage.getItem('product'));
    const index = this.productAddedTocart.indexOf(p => p.id == product.id) + 1;
    this.productAddedTocart[index].count++;
    localStorage.setItem("product", JSON.stringify(this.productAddedTocart));

  }
  onRemoveQuantity(product) {
    this.productAddedTocart = JSON.parse(localStorage.getItem('product' || ''));
    if (this.productAddedTocart.length > 0) {
      const found = this.productAddedTocart.find(p => p.id == product.id).count;
      if (found === 1) {
        product.count--;
        var delArray = this.productAddedTocart.filter(p => p.id != product.id);
        this.productAddedTocart = delArray;
        localStorage.setItem("product", JSON.stringify(this.productAddedTocart));
      }
      if (found > 1) {
        product.count--;
        this.productAddedTocart.find(p => p.id == product.id).count--;
        localStorage.setItem("product", JSON.stringify(this.productAddedTocart));
      }
      this.calculateTotalCost(this.productAddedTocart);
    }
  }

  calculateTotalCost(allItems) {
    let total = 0;
    let totalQuantity = 0;
    for (let i in allItems) {
      total = total + (allItems[i].count * allItems[i].discount_mrp);
      totalQuantity = totalQuantity + allItems[i].count;
    }
    this.totalCost = total;
    this.totalQuantity = totalQuantity;
  }

  openModal() {
    let dialogRef = this.dialog.open(SucessBoxComponent, {
      height: '200px',
      width: '50%',
      data: { totalCost: this.totalCost, totalQuantity: this.totalQuantity }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      localStorage.removeItem('product');
      this.productAddedTocart = [];
      this.allProducts.forEach(element => {
        element.count = 0;
      });
      this.totalCost = 0;
      this.totalQuantity = 0;
    });

  }
}
