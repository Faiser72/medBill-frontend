import { SupplierMasterService } from './../../../../service/supplierMaster/supplier-master.service';
import { OrderService } from "./../../../../service/order/order.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { isNullOrUndefined } from "util";

class createOrder {
  productType: any;
  productName: any;
  manufacturer: any;
  packaging: any;
  quantity: any;
  unitPrice: any;
  amount: any;
}

@Component({
  selector: "app-create-order",
  templateUrl: "./create-order.component.html",
  styleUrls: ["./create-order.component.scss"],
})
export class CreateOrderComponent implements OnInit {
  allProductTypeList: any;
  allProductList: any;
  allSupplierName: any;

  orderArray: Array<createOrder> = [];
  createOrder: any = {};
  addOrderDetails: FormGroup;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private orderService: OrderService,
    private supplierMasterService :SupplierMasterService,
    private appComponent: AppComponent
  ) {
    this.addOrderDetailsFormBuilder();
  }

  ngOnInit() {
    // for multile contact form starts
    this.createOrder = {
      productType: "",
      productName: "",
      manufacturer: "",
      packaging: "",
      quantity: "",
      unitPrice: "",
      amount: "",
    };
    this.orderArray.push(this.createOrder);
    // for multile contact form ends

    this.getProductTypeList();
    this.getorderIdAuto();
    this.getAllSupplierNames();
  }

  getorderIdAuto(){
    this.orderService.getOrderIdAuto().subscribe((data: any) => {
      this.addOrderDetails.patchValue({orderNumber:data.object})
    });
  }
  getAllSupplierNames(){
    this.supplierMasterService.getAllSupplierList().subscribe((data: any) => {
      this.allSupplierName = data.listObject;
      console.log( this.allSupplierName );
      
    });
  }

  addOrderDetailsFormBuilder() {
    this.addOrderDetails = this.fb.group({
      orderNumber: ["", Validators.required],
      orderDate: ["", Validators.required],
      supplierName: ["", Validators.required],
      orderGrandTotal: ["", Validators.required],
      orderItemList: [""],
      // itemName: "",
      // itemCode: "",
      // quantity: "",
      // unitPrice: "",
      // amount: "",
      // remarks: "",
    });
  }

  getProductTypeList() {
    this.orderService.productCategoryList().subscribe((data: any) => {
      this.allProductTypeList = data.listObject;
    });
  }

  addRow() {
    this.createOrder = {
      productType: "",
      productName: "",
      manufacturer: "",
      packaging: "",
      quantity: "",
      unitPrice: "",
      amount: "",
    };
    this.orderArray.push(this.createOrder);
    this.validateOrderDetails(-1);
    return true;
  }

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
      this.getProductListUsingCategoryId(productTypeValue.categoryId, i);
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
        this.orderArray[i].amount = 0;
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

  calculateSubTotalAmounts() {
    let subTotal = 0;
    this.orderArray.forEach((element) => {
      subTotal += element.amount;
    });
    this.addOrderDetails.patchValue({
      orderGrandTotal: subTotal,
    });
  }

  allProductLists:any=[];
  getProductListUsingCategoryId(id: any, i) {
    this.orderService.getPrductsByCategoryId(id).subscribe((data: any) => {
      // this.allProductList = data.listObject;
      this.allProductLists[i]=data.listObject; 
    });
  }

  deleteRow(index: any) {
    if (this.orderArray.length == 1) {
      return false;
    } else {
      this.orderArray.splice(index, 1);
      this.validateOrderDetails(-1);
      return true;
    }
  }

  reset() {
    this.orderArray = [];
    this.addRow();
  }

  // itemParticularForm(): boolean {
  //   let productType: any = [];
  //   let productName: any = [];
  //   let manufacturer: any = [];
  //   let packaging: any = [];
  //   let quantity: any = [];
  //   let unitPrice: any = [];
  //   let amount: any = [];
  //   this.orderArray.forEach((object, i) => {
  //     console.log(object);

  //     productType[i] = object.productType.categoryName;
  //     productName[i] = object.productName.productName;
  //     manufacturer[i] = object.quantity;
  //     unitPrice[i] = object.manufacturer;
  //     packaging[i] = object.packaging;
  //     quantity[i] = object.quantity;
  //     unitPrice[i] = object.unitPrice;

  //     if (amount.includes(".")) {
  //       amount[i] = object.amount;
  //     } else {
  //       amount[i] = object.amount + ".00";
  //     }
  //   });

  //   this.addOrderDetails.patchValue({
  //     productType: productType.join(","),
  //     productName: productName.join(","),
  //     manufacturer: manufacturer.join(","),
  //     unitPrice: unitPrice.join(","),
  //     packaging: packaging.join(","),
  //     quantity: quantity.join(","),
  //     unitPrice: unitPrice.join(","),
  //     amount: unitPrice.join(","),
  //   });

  //   return true;
  // }

  addOrderFormubmit() {
    if (this.orderDetailFlag && this.addOrderDetails.valid) {
      this.appComponent.startSpinner("Saving data..\xa0\xa0Please wait ...");
      this.addOrderDetails.patchValue({orderItemList:this.orderArray}) 
      this.orderService
        .saveOrderDetails(this.addOrderDetails.value)
        .subscribe(
          (resp: any) => {
            if (resp.success) {
              alert(resp.message);
              this.appComponent.stopSpinner();
              setTimeout(() => {
                if (confirm("Do you want to create more Order?")) {
                  location.reload();
                } else {
                  //this.backToItemCategoryList();
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
}
