import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { isNullOrUndefined } from 'util';

class purchaseOrder {
  itemName: any;
  itemCode: any;
  quantity: any;
  unitPrice: any;
  amount: any;
  remarks: any;
}

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  allSupplierName = [
    { values: 'Om Medi Serve', viewValue: 'Local' },
    { values: 'Hira Drug House', viewValue: 'Interstate' },
    { values: 'Veto Drug House', viewValue: 'Interstate' },
  ]; 

  allItemList: any;
  allVendorList: any;

  purchaseOrderArray: Array<purchaseOrder> = [];
  purchaseOrder: any = {};
  addPurchaseOrderDetails: FormGroup;

  
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private appComponent: AppComponent
  ) {
    this.addPurchaseOrderDetailsFormBuilder();
  }

  ngOnInit() {

    // for multile contact form starts
    this.purchaseOrder = {
      itemName: "",
      itemCode: "",
      quantity: "",
      unitPrice: "",
      amount: "",
      remarks: "",
    };
    this.purchaseOrderArray.push(this.purchaseOrder);
    // for multile contact form ends
  }

  addPurchaseOrderDetailsFormBuilder() {
    this.addPurchaseOrderDetails = this.fb.group({
      purchaseOrderNumber: ["", Validators.required],
      purchaseOrderDate: ["", Validators.required],
      vendorName: ["", Validators.required],
      purchaseOrderSubTotal: ["", Validators.required],
      purchaseOrderTax: ["", Validators.required],
      purchaseOrderTotal: ["", Validators.required],
      purchaseOrderList: ['']
      // itemName: "",
      // itemCode: "",
      // quantity: "",
      // unitPrice: "",
      // amount: "",
      // remarks: "",
    });
  }

  addRow() {
    this.purchaseOrder = {
      itemName: "",
      itemCode: "",
      quantity: "",
      unitPrice: "",
      amount: "",
      remarks: "",
    };
    this.purchaseOrderArray.push(this.purchaseOrder);
    this.validatePurchaseOrderDetails(-1);
    return true;
  }

  purchaseOrderDetailsFlag: boolean = false;
  validatePurchaseOrderDetails(i: number) {
    this.purchaseOrderDetailsFlag = false;
    if (i > -1) {
      this.itemNameRow(this.purchaseOrderArray[i].itemName, i);
      this.quantityRow(this.purchaseOrderArray[i].quantity, i);
      this.unitPriceRow(this.purchaseOrderArray[i].unitPrice, i);
    }
    this.purchaseOrderArray.every((object, index) => {
      let itemNameRowFlag = this.itemNameRow(object.itemName, index);
      let quantityRowFlag = this.quantityRow(object.quantity, index);
      let unitPriceFlag = this.unitPriceRow(object.unitPrice, index);
      if (itemNameRowFlag && quantityRowFlag && unitPriceFlag) {
        this.purchaseOrderDetailsFlag = true;
        return true;
      } else {
        this.purchaseOrderDetailsFlag = false;
        return false;
      }
    });
    return this.purchaseOrderDetailsFlag;
  }

  itemNameRow(itemNameValue: any, i: number) {
    if (itemNameValue != "") {
      document.getElementById("itemNameMsg" + i).innerHTML = "";
      this.purchaseOrderArray[i].itemCode = itemNameValue.itemCode;
      // this.purchaseOrderArray[i].unitPrice = itemNameValue.itemUnitPrice;
      // (<HTMLInputElement>document.getElementById("itemCode" + i)).value = itemNameValue.itemCode;
      // (<HTMLInputElement>document.getElementById("unitPrice" + i)).value = itemNameValue.itemUnitPrice;
      return true;
    } else {
      if (!isNullOrUndefined(document.getElementById("itemNameMsg" + i))) {
        document.getElementById("itemNameMsg" + i).innerHTML =
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

  calculateSubTotalAmounts() {
    let subTotal = 0;
    this.purchaseOrderArray.forEach((element) => {
      subTotal += element.amount;
    });
    this.addPurchaseOrderDetails.patchValue({
      purchaseOrderSubTotal: subTotal,
    });

    let taxRate = this.addPurchaseOrderDetails.get("purchaseOrderTax").value;
    if (!isNullOrUndefined(taxRate)) {
      this.calculateTotalAmount(subTotal, taxRate);
    } else {
      this.addPurchaseOrderDetails.patchValue({ purchaseOrderTax: 0 });
      this.calculateTotalAmount(subTotal, 0);
    }
  }

  deleteRow(index: any) {
    if (this.purchaseOrderArray.length == 1) {
      return false;
    } else {
      this.purchaseOrderArray.splice(index, 1);
      this.validatePurchaseOrderDetails(-1);
      return true;
    }
  }

  calculateTotalAmount(subTotal, taxRate) {
    let taxAmt = Math.round((subTotal / 100) * taxRate);
    if (!isNullOrUndefined(taxAmt)) {
      let totalAmt = +subTotal + +taxAmt;
      this.addPurchaseOrderDetails.patchValue({ purchaseOrderTotal: totalAmt });
    } else {
      this.addPurchaseOrderDetails.patchValue({ purchaseOrderTotal: 0 });
    }
  }

  reset() {
    this.purchaseOrderArray = [];
    this.addRow();
  }

  itemParticularForm(): boolean {
    let itemName: any = [];
    let itemCode: any = [];
    let quantity: any = [];
    let unitPrice: any = [];
    let amount: any = [];
    let remarks: any = [];
    this.purchaseOrderArray.forEach((object, i) => {
      console.log(object);

      itemName[i] = object.itemName.itemName;
      itemCode[i] = object.itemCode;
      quantity[i] = object.quantity;
      unitPrice[i] = object.unitPrice;
      remarks[i] = object.remarks;

      if (amount.includes(".")) {
        amount[i] = object.amount;
      } else {
        amount[i] = object.amount + ".00";
      }
    });

    this.addPurchaseOrderDetails.patchValue({
      itemName: itemName.join(","),
      itemCode: itemCode.join(","),
      quantity: quantity.join(","),
      unitPrice: unitPrice.join(","),
      amount: unitPrice.join(","),
      remarks: unitPrice.join(","),
    });

    return true;
  }

}
