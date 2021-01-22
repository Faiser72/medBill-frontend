import { OrderService } from './../../../../service/order/order.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';


class createOrder {
  productType: any;
  productName: any;
  manufacturer: any;
  packaging: any;
  quantity: any;
  unitPrice: any;
  amount: any;
}

// "itemCode",
//     "itemName",
//     "itemUnitOfMeasure",
//     "itemUnitPrice",
//     "quanttity",
//     "unitPrice",
//     "batchName",
//     "manufactureDate",
//     "expiryDate",
//     "totalAmount",

@Component({
  selector: 'app-purchase-entry',
  templateUrl: './purchase-entry.component.html',
  styleUrls: ['./purchase-entry.component.scss']
})
export class PurchaseEntryComponent implements OnInit {

  allSupplierName = [
    { value: 'Om Medi Serve', viewValue: 'Local' },
    { value: 'Hira Drug House', viewValue: 'Interstate' },
    { value: 'Veto Drug House', viewValue: 'Interstate' },
  ];

  orderArray: Array<createOrder> = [];
  createOrder: any = {};

  deleted_successfully_message: string = "Deleted Successfully";
  itemList;

  orderList: any;
  filteredOrderOptions: Observable<any>;

  allProductTypeList:any; //temp
  allProductList:any;//temp


  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "itemCode",
    "itemName",
    "itemUnitOfMeasure",
    "itemUnitPrice",
    "quanttity",
    "unitPrice",
    "batchName",
    "manufactureDate",
    "expiryDate",
    "totalAmount",
  ];


  addPurchaseEntry: FormGroup;
  constructor(private fb: FormBuilder,
    private route: Router,
    private orderService: OrderService) { }

  ngOnInit() {
    this.addPurchaseEntry = this.fb.group({
      orderNumber: ['', Validators.required],
      orderDate: ['', Validators.required],
      receivedDate: ['', Validators.required],
      supplierName: ['', Validators.required],
      supplierInvoiceNumber: ['', Validators.required],
    });
    this.addPurchaseEntry.setValidators(this.customValidation());

    // To get all the orders list
    this.getOrderList();
  }

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

  // order autocomplete starts here
  displayFn(order: any): string {
    return order && order.orderNumber ? order.orderNumber : '';
  }

  private _filter(order: string): any {

    const filterValue = order.toLowerCase();
    return this.orderList.filter(order => order.orderNumber.toLowerCase().indexOf(filterValue) === 0);
  }
  // order autocomplete ends here



  // for multiple row validation starts here
  orderDetailFlag: boolean = false;
  validateOrderDetails(i: number) {
    this.orderDetailFlag = false;
    if (i > -1) {
      this.productTypeRow(this.orderArray[i].productType, i);
      this.productNameRow(this.orderArray[i].productName, i);
      this.quantityRow(this.orderArray[i].quantity, i);
      this.unitPriceRow(this.orderArray[i].unitPrice, i);
    }
    this.orderArray.every((object, index) => {
      let productTypeRowFlag = this.productTypeRow(object.productType, index);
      let productNameFlag = this.productNameRow(object.productName, index);
      let quantityRowFlag = this.quantityRow(object.quantity, index);
      let unitPriceFlag = this.unitPriceRow(object.unitPrice, index);
      if (
        productTypeRowFlag &&
        productNameFlag &&
        quantityRowFlag &&
        unitPriceFlag
      ) {
        this.orderDetailFlag = true;
        return true;
      } else {
        this.orderDetailFlag = false;
        return false;
      }
    });
    return this.orderDetailFlag;
  }

  productNameRow(productNameValue: any, i: number) {
    if (productNameValue != "") {
      console.log(productNameValue);

      document.getElementById("productNameMsg" + i).innerHTML = "";
      this.orderArray[i].manufacturer =
        productNameValue.manufacturer.manufacturerName;
      // this.purchaseOrderArray[i].unitPrice = itemNameValue.itemUnitPrice;
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
    if (productTypeValue != "") {
      document.getElementById("productTypeMsg" + i).innerHTML = "";

      // this.getProductListUsingCategoryId(productTypeValue.categoryId);

      //this.orderArray[i].productName = productTypeValue.itemCode;
      // this.purchaseOrderArray[i].unitPrice = itemNameValue.itemUnitPrice;
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
        this.orderArray[i].amount = amount;
        // this.calculateSubTotalAmounts();
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
        this.orderArray[i].amount = 0;
        // this.calculateSubTotalAmounts();
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
  // for multiple row validation ends here

  // custom validation starts
  orderNumberInputMsg: string; orderNumber: string;

  customValidation(): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors => {
      // for orderNumber Autocomplete starts here
      const orderNumberFormGroup = formGroup.controls["orderNumber"];
      if (orderNumberFormGroup.value !== "" && orderNumberFormGroup.value !== null) {
        if (typeof (orderNumberFormGroup.value) !== 'object') {
          console.log(typeof (orderNumberFormGroup.value));

          this.orderNumberInputMsg = "Please select from the List";
          orderNumberFormGroup.setErrors({});
        }
      } else {
        this.orderNumberInputMsg = "Please enter this field.";
        orderNumberFormGroup.setErrors({});
      }
      // for orderNumber Autocomplete ends here

      return;
    };
  }
  // custom validation ends
}
