import { ProductMasterServiceService } from 'src/app/service/productMaster/product-master-service.service';
import { AppComponent } from './../../../../app.component';
import { Location } from '@angular/common';
import { OrderService } from './../../../../service/order/order.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { isNull, isNullOrUndefined } from 'util';
import { PurchaseEntryService } from 'src/app/service/purchaseEntry/purchase-entry.service';


class createOrder {
  productType: any;
  productName: any;
  manufacturer: any;
  packaging: any;
  quantity: any;
  unitPrice: any;
  batchNumber: any;
  manufactureDate: any;
  expiryDate: any;
  amount: any;
}

@Component({
  selector: 'app-purchase-entry',
  templateUrl: './purchase-entry.component.html',
  styleUrls: ['./purchase-entry.component.scss']
})
export class PurchaseEntryComponent implements OnInit {

  purchaseOrderArray: Array<createOrder> = [];
  createOrder: any = {};

  deleted_successfully_message: string = "Deleted Successfully";
  
  orderItemList: any;
  allPurchaseEntryList: any;

  orderList: any;
  filteredOrderOptions: Observable<any>;

  allProductTypeList: any;
  allProductList: any;

  addPurchaseEntry: FormGroup;

  constructor(private fb: FormBuilder,
    private route: Router,
    private orderService: OrderService,
    private location: Location,
    private appComponent: AppComponent,
    private purchaseEntryService: PurchaseEntryService,
    private productService: ProductMasterServiceService) { }

  ngOnInit() {
    this.addPurchaseEntry = this.fb.group({
      orderNumber: ['', Validators.required],
      orderDate: ['', Validators.required],
      receivedDate: ['', Validators.required],
      supplierName: ['', Validators.required],
      supplierInvoiceNumber: ['', Validators.required],
      purchaseEntrySubTotal: ["", Validators.required],
      purchaseEntryTax: ["", Validators.required],
      purchaseEntryTotal: ["", Validators.required],
      purchaseEntryList: [''],
      purchaseEntryDiscount: "",
      stockList: [''],
    });
    this.addPurchaseEntry.setValidators(this.customValidation());

    // To get all the orders list
    this.getOrderList();

    // to get all category list
    this.getProductTypeList();

    // to get all product list
    this.getProductList();

    // To get Purchase entry list for unique validation of orderNumber
    this.getPurchaseEntryList();

  }

  getProductTypeList() {
    this.orderService.productCategoryList().subscribe((data: any) => {
      this.allProductTypeList = data.listObject;
      console.log(this.allProductTypeList);
    });
  }

  getProductList() {
    this.productService.productList().subscribe((data: any) => {
      this.allProductList = data.listObject;
      console.log(this.allProductList);
    });
  }

  getPurchaseEntryList() {
    this.purchaseEntryService.getPurchaseEntryList().subscribe((data: any) => {
      this.allPurchaseEntryList = data.listObject;
      console.log(this.allPurchaseEntryList);
    });
  }

  // getting order details by order id
  orderDetailsById(orderObj) {
    console.log(orderObj);
    this.addPurchaseEntry.patchValue({ orderDate: orderObj.value.orderDate, supplierName: orderObj.value.supplierName.supplierName })
    this.orderService.orderListByOrderId(orderObj.value.orderId).subscribe((data: any) => {
      if (data.success) {
        this.clearFormArray(this.purchaseOrderArray)
        this.getOrderListDetails(data);
        this.calculateSubTotalAmounts();
        this.orderItemList = data;
      }
    })

  }

  // patching order data in to purchase entry data
  getOrderListDetails(orderData) {
    for (let index = 0; index < orderData.listObject.length; index++) {
      this.createOrder = {
        productType: orderData.listObject[index].productType,
        productName: orderData.listObject[index].productName,
        manufacturer: orderData.listObject[index].manufacturer,
        packaging: orderData.listObject[index].packaging,
        quantity: orderData.listObject[index].quantity,
        unitPrice: orderData.listObject[index].unitPrice,
        amount: orderData.listObject[index].amount,
        batchNumber: "",
        manufactureDate: "",
        expiryDate: "",
      };
      this.purchaseOrderArray.push(this.createOrder);
    }
  }

  // for patching fk object of productType(productCategory) in add row
  public matchProductType = (product, value): boolean => {
    if (value) {
      return product.categoryId === value.categoryId;
    }
  };

    // for patching fk object of product in add row
  public matchProductName = (productName, value): boolean => {
    console.log(productName);
    if (value) {
      return productName.productId === value.productId;
    }
  };


 // order autocomplete starts here
  getOrderList() {
    this.orderService.orderList().subscribe((data: any) => {
      if (data.success) {
        console.log(data);
        this.orderList = data['listObject'];
        this.filteredOrderOptions = this.addPurchaseEntry.get('orderNumber').valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.orderNumber),
          map(order => order ? this._filter(order) : this.orderList.slice()));
      } else {
        alert('No order is available')
      }
    });
  }

  displayFn(order: any): string {
    return order && order.orderNumber ? order.orderNumber : '';
  }

  private _filter(order: string): any {
    const filterValue = order.toLowerCase();
    return this.orderList.filter(order => order.orderNumber.toLowerCase().indexOf(filterValue) === 0);
  }
  // order autocomplete ends here



  // for multiple row validation starts here
  purchaseOrderDetailFlag: boolean = false;
  validateOrderDetails(i: number) {
    this.purchaseOrderDetailFlag = false;
    if (i > -1) {
      this.productTypeRow(this.purchaseOrderArray[i].productType, i);
      this.productNameRow(this.purchaseOrderArray[i].productName, i);
      this.quantityRow(this.purchaseOrderArray[i].quantity, i);
      this.unitPriceRow(this.purchaseOrderArray[i].unitPrice, i);
      this.manufactureDateRow(this.purchaseOrderArray[i].manufactureDate, i)
      this.expiryDateRow(this.purchaseOrderArray[i].expiryDate, i);
    }
    this.purchaseOrderArray.every((object, index) => {
      let productTypeRowFlag = this.productTypeRow(object.productType, index);
      let productNameFlag = this.productNameRow(object.productName, index);
      let quantityRowFlag = this.quantityRow(object.quantity, index);
      let unitPriceFlag = this.unitPriceRow(object.unitPrice, index);
      let manufactureDateFlag = this.manufactureDateRow(object.manufactureDate, index)
      let expiryDateFlag = this.expiryDateRow(object.expiryDate, index)
      if (
        productTypeRowFlag &&
        productNameFlag &&
        quantityRowFlag &&
        unitPriceFlag &&
        manufactureDateFlag &&
        expiryDateFlag
      ) {
        this.purchaseOrderDetailFlag = true;
        return true;
      } else {
        this.purchaseOrderDetailFlag = false;
        return false;
      }
    });
    return this.purchaseOrderDetailFlag;
  }

  productNameRow(productNameValue: any, i: number) {
    if (productNameValue != "") {

      document.getElementById("productNameMsg" + i).innerHTML = "";
      // this.purchaseOrderArray[i].manufacturer =
      //   productNameValue.manufacturer.manufacturerName;
      // this.purchasepurchaseOrderArray[i].unitPrice = itemNameValue.itemUnitPrice;
      // (<HTMLInputElement>document.getElementById("itemCode" + i)).value = itemNameValue.itemCode;
      // (<HTMLInputElement>document.getElementById("unitPrice" + i)).value = itemNameValue.itemUnitPrice;
      return true;
    } else {
      if (!isNullOrUndefined(document.getElementById("productNameMsg" + i))) {
        document.getElementById("productNameMsg" + i).innerHTML =
          "Please select this option.";
      }
      return false;
    }
  }

  productTypeRow(productTypeValue: any, i: number) {
    console.log(productTypeValue);

    if (productTypeValue != "") {
      document.getElementById("productTypeMsg" + i).innerHTML = "";

      // this.getProductListUsingCategoryId(productTypeValue.categoryId);

      //this.purchaseOrderArray[i].productName = productTypeValue.itemCode;
      // this.purchasepurchaseOrderArray[i].unitPrice = itemNameValue.itemUnitPrice;
      // (<HTMLInputElement>document.getElementById("itemCode" + i)).value = itemNameValue.itemCode;
      // (<HTMLInputElement>document.getElementById("unitPrice" + i)).value = itemNameValue.itemUnitPrice;
      return true;
    } else {
      if (!isNullOrUndefined(document.getElementById("productTypeMsg" + i))) {
        document.getElementById("productTypeMsg" + i).innerHTML =
          "Please select this option.";
      }
      return false;
    }
  }

  quantityRow(quantityValue: any, i: number) {
    if (quantityValue != "") {
      if (quantityValue.match(/^[0-9]+$/)) {
        document.getElementById("quantityMsg" + i).innerHTML = "";
        let unitPrice: any = (<HTMLInputElement>(
          document.getElementById("unitPrice" + i)
        )).value;
        let amount: any = quantityValue * unitPrice;
        // (<HTMLInputElement>document.getElementById("amount" + i)).value = amount;
        this.purchaseOrderArray[i].amount = amount;
        this.calculateSubTotalAmounts();
        return true;
      } else {
        document.getElementById("quantityMsg" + i).innerHTML =
          "Please enter only digits.";
        return false;
      }
    } else {
      if (!isNullOrUndefined(document.getElementById("quantityMsg" + i))) {
        document.getElementById("quantityMsg" + i).innerHTML =
          "Please enter this field.";
        this.purchaseOrderArray[i].amount = 0;
        this.calculateSubTotalAmounts();
      }
      return false;
    }
  }

  unitPriceRow(unitPriceValue: any, i: number) {
    if (unitPriceValue != "") {
      if (unitPriceValue.match(/^[0-9]+$/)) {
        document.getElementById("unitPriceMsg" + i).innerHTML = "";
        return true;
      } else {
        document.getElementById("unitPriceMsg" + i).innerHTML =
          "Please enter only digits.";
        return false;
      }
    } else {
      if (!isNullOrUndefined(document.getElementById("unitPriceMsg" + i))) {
        document.getElementById("unitPriceMsg" + i).innerHTML =
          "Please enter this field.";
      }
      return false;
    }
  }

  manufactureDateRow(manufactureDateValue: string, i: number) {
    if ((!isNull(manufactureDateValue)) && (manufactureDateValue != "")) {
      document.getElementById("manufactureDate" + i).innerHTML = "";
      return true;
    } else {
      if (!isNullOrUndefined(document.getElementById("manufactureDate" + i))) {
        document.getElementById("manufactureDate" + i).innerHTML = "Please select date field";
      }
      return false;
    }
  }

  expiryDateRow(expiryDateValue: string, i: number) {
    if ((!isNull(expiryDateValue)) && (expiryDateValue != "")) {
      document.getElementById("expiryDate" + i).innerHTML = "";
      return true;
    } else {
      if (!isNullOrUndefined(document.getElementById("expiryDate" + i))) {
        document.getElementById("expiryDate" + i).innerHTML = "Please select date field";
      }
      return false;
    }
  }
  // for multiple row validation ends here

  calculateGrossAmtByDiscount() {
    // let discount = this.addPurchaseEntry.get("purchaseEntryDiscount").value;

    let discount: any = document.getElementById('purchaseEntryDiscount');
    console.log(discount.value);

    let subTotal = this.addPurchaseEntry.get("purchaseEntrySubTotal").value;

    let discAmt = Math.round((subTotal / 100) * discount.value);
    this.addPurchaseEntry.patchValue({ purchaseEntryDiscount: discAmt })
    // if(!isNullOrUndefined(discAmt)){
    //   let totalAmt = +subTotal - + discAmt;
    //   this.addPurchaseEntry.patchValue({ purchaseEntryTotal: totalAmt})
    // }
    // else {
    //     this.addPurchaseEntry.patchValue({ purchaseEntryTotal: 0 });
    //   }

  }

  calculateSubTotalAmounts() {
    let subTotal = 0;
    this.purchaseOrderArray.forEach((element) => {
      subTotal += +element.amount;
    });
    this.addPurchaseEntry.patchValue({
      purchaseEntrySubTotal: subTotal,
    });

    let taxRate = this.addPurchaseEntry.get("purchaseEntryTax").value;
    if (!isNullOrUndefined(taxRate)) {
      this.calculateTotalAmount(subTotal, taxRate);
    } else {
      this.addPurchaseEntry.patchValue({ purchaseEntryTax: 0 });
      this.calculateTotalAmount(subTotal, 0);
    }
  }

  calculateTotalAmount(subTotal, taxRate) {
    let taxAmt = Math.round((subTotal / 100) * taxRate);
    if (!isNullOrUndefined(taxAmt)) {
      let totalAmt = +subTotal + +taxAmt;
      this.addPurchaseEntry.patchValue({ purchaseEntryTotal: totalAmt });
    } else {
      this.addPurchaseEntry.patchValue({ purchaseEntryTotal: 0 });
    }
  }

  addPurchaseEntryFormSubmit() {
    if (this.purchaseOrderDetailFlag && this.addPurchaseEntry.valid) {
      this.appComponent.startSpinner("Saving data..\xa0\xa0Please wait ...");
      this.addPurchaseEntry.patchValue({ purchaseEntryList: this.purchaseOrderArray, stockList: this.purchaseOrderArray })
      this.purchaseEntryService
        .savePurchaseEntryDetails(this.addPurchaseEntry.value)
        .subscribe(
          (resp: any) => {
            if (resp.success) {
              alert(resp.message);
              this.appComponent.stopSpinner();
              setTimeout(() => {
                if (confirm("Do you want add more Item ?")) {
                  this.addPurchaseEntry.reset();
                  this.clearFormArray(this.purchaseOrderArray)
                  // location.reload();
                } else {
                  this.location.back();
                }
              }, 500);
            } else {
              setTimeout(() => {
                alert(resp.message);
                this.appComponent.stopSpinner();
              }, 1000);
            }
          },
          (error) => {
            setTimeout(() => {
              alert("Error! - Something Went Wrong! Try again.");
              this.appComponent.stopSpinner();
            }, 1000);
          }
        );
    } else {
      alert("Please, fill the proper details.");
    }
  }

  // custom validation starts
  orderNumberInputMsg: string; orderNumber: string;

  customValidation(): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors => {
      // for orderNumber Autocomplete starts here
      const orderNumberFormGroup = formGroup.controls["orderNumber"];
      if (orderNumberFormGroup.value !== "" && orderNumberFormGroup.value !== null) {
        console.log(orderNumberFormGroup.value);

        if (typeof (orderNumberFormGroup.value) !== 'object') {
          console.log(typeof (orderNumberFormGroup.value));

          this.orderNumberInputMsg = "Please select from the List";
          orderNumberFormGroup.setErrors({});
        }
        //        for unique starts here   
        if (orderNumberFormGroup.valid) {
          if (!isNullOrUndefined(this.allPurchaseEntryList)) {
            this.allPurchaseEntryList.forEach((data: any) => {
              if (data.orderNumber.orderNumber == orderNumberFormGroup.value.orderNumber) {
                this.orderNumber = data.orderNumber;
                this.orderNumberInputMsg = "This Order is Purchased already";
                orderNumberFormGroup.setErrors({});
              }
            });
          }
        }
        // for unique ends here  

      }
      else {

        this.orderNumberInputMsg = "Please enter this field.";
        orderNumberFormGroup.setErrors({});
      }
      // for orderNumber Autocomplete ends here

      return;
    };
  }
  // custom validation ends


  // To Reset Dynamic Array starts here
  clearFormArray(purchaseOrderArray) {
    for (let index = purchaseOrderArray.length; index >= 0; index--) {
      purchaseOrderArray.splice(index)
    }
  }
  // To Reset Dynamic Array ends here

  gotoBack() {
    this.location.back();
  }

}



