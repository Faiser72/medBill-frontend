import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { isNullOrUndefined } from 'util';
declare var $:any;

class salesOrder {
  itemName: any;
  itemCode: any;
  quantity: any;
  unitPrice: any;
  amount: any;
  remarks: any;
}
@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.scss']
})
export class AddSalesComponent implements OnInit {

  
  allItemList: any;
  allVendorList: any;
  allCustomerList:any;
  salesOrderArray: Array<salesOrder> = [];
  salesOrder: any = {};
  addSalesQuotation: FormGroup;
  taxList: any;
  isgstTypeValue:boolean=false;
  isgstTypeValueinterstate:boolean=false;

  GSTType = [
    { value: 'local', viewValue: 'Local' },
    { value: 'interState', viewValue: 'Interstate' },
  ];

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private appComponent: AppComponent
  ) {
    this.addSalesQuotationDetailsFormBuilder();
  }

  ngOnInit() {

    // for multile contact form starts
    this.salesOrder = {
      itemName: "",
      itemCode: "",
      quantity: "",
      unitPrice: "",
      amount: "",
      remarks: "",
    };
    this.salesOrderArray.push(this.salesOrder);
    // for multile contact form ends
  }

  addSalesQuotationDetailsFormBuilder() {
    this.addSalesQuotation = this.fb.group({
      saleName: ["", Validators.required],
      invoiceNumber: ["", Validators.required],
      doctorName: ["", Validators.required],
      salesQuotationDate: ["", Validators.required],
      salesQuotationSubTotal: ["", Validators.required],
      salesQuotationTax: [""],
      salesQuotationSgst: [""],
      salesQuotationCgst: [""],
      salesQuotationIgst: [""],
      salesQuotationTotal: [""],
      salesQuotationList: [''],
      // itemName: "",
      // itemCode: "",
      // quantity: "",
      // unitPrice: "",
      // amount: "", 
      // remarks: "",
    });
  }

  gstType:string;

  gstTypeValue(selectedValue){ 
    this.gstType = selectedValue.value;
      if(selectedValue.value=='local'){      
      this.addSalesQuotation.patchValue({ salesQuotationSgst: this.taxList[0].taxLocalSgst });
      this.addSalesQuotation.patchValue({ salesQuotationCgst: this.taxList[0].taxLocalCgst });
      this.isgstTypeValueinterstate=false;
      this.isgstTypeValue=true;
      this.calculateSubTotalAmounts();
      
    }
    else if(selectedValue.value=='interState'){
      this.addSalesQuotation.patchValue({ salesQuotationIgst: this.taxList[1].taxInterstateIgst });
      this.isgstTypeValue=false;
      this.isgstTypeValueinterstate=true;
      this.calculateSubTotalAmounts();
      
    }
  }

  addRow() {
    this.salesOrder = {
      itemName: "",
      itemCode: "",
      quantity: "",
      unitPrice: "",
      amount: "",
      remarks: "",
    };
    this.salesOrderArray.push(this.salesOrder);
    this.validatesalesQuotationDetails(-1);
    return true;
  }

  salesQuotationDetailsFlag: boolean = false;
  validatesalesQuotationDetails(i: number) {
    this.salesQuotationDetailsFlag = false;
    if (i > -1) {
      this.itemNameRow(this.salesOrderArray[i].itemName, i);
      this.quantityRow(this.salesOrderArray[i].quantity, i);
      this.unitPriceRow(this.salesOrderArray[i].unitPrice, i);
    }
    this.salesOrderArray.every((object, index) => {
      let itemNameRowFlag = this.itemNameRow(object.itemName, index);
      let quantityRowFlag = this.quantityRow(object.quantity, index);
      let unitPriceFlag = this.unitPriceRow(object.unitPrice, index);
      if (itemNameRowFlag && quantityRowFlag && unitPriceFlag) {
        this.salesQuotationDetailsFlag = true;
        return true;
      } else {
        this.salesQuotationDetailsFlag = false;
        return false;
      }
    });
    return this.salesQuotationDetailsFlag;
  }

  itemNameRow(itemNameValue: any, i: number) {
    if (itemNameValue != "") {
      document.getElementById("itemNameMsg" + i).innerHTML = "";
      this.salesOrderArray[i].itemCode = itemNameValue.itemCode;
      this.salesOrderArray[i].unitPrice = itemNameValue.itemUnitPrice;
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
        this.salesOrderArray[i].amount = amount;
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
        this.salesOrderArray[i].amount = 0;
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
    this.salesOrderArray.forEach((element) => {
      subTotal += element.amount;
    });
    this.addSalesQuotation.patchValue({
      salesQuotationSubTotal: subTotal,
    });
  
      
    let sgst = this.addSalesQuotation.get("salesQuotationSgst").value;
    let cgst = this.addSalesQuotation.get("salesQuotationCgst").value;
    let igst = this.addSalesQuotation.get("salesQuotationIgst").value;
    
    if (!isNullOrUndefined(sgst) && !isNullOrUndefined(cgst) && !isNullOrUndefined(cgst)) {
      this.calculateTotalAmount(subTotal,sgst,cgst,igst);
    } else {
      this.addSalesQuotation.patchValue({ salesQuotationSgst: 0 });
      this.addSalesQuotation.patchValue({ salesQuotationCgst: 0 });
      this.addSalesQuotation.patchValue({ salesQuotationIgst: 0 });
      this.calculateTotalAmount(subTotal,sgst,cgst,igst);
    }

  }

  deleteRow(index: any) {
    if (this.salesOrderArray.length == 1) {
      return false;
    } else {
      this.salesOrderArray.splice(index, 1);
      this.validatesalesQuotationDetails(-1);
      return true;
    }
  }

  calculateTotalAmount(subTotal,sgst,cgst,igst) {
    //alert(this.gstType)
    if(this.gstType === "local"){ 
    let cal1 = Math.round((subTotal / 100) * sgst);
    let cal2 = Math.round((subTotal / 100) * cgst);
    let taxAmt = cal1+cal2
    if (!isNullOrUndefined(cal1) && !isNullOrUndefined(cal2)) {
       let totalAmt = +subTotal + +taxAmt;
            
        this.addSalesQuotation.patchValue({ salesQuotationTotal: totalAmt });
      } else {
        this.addSalesQuotation.patchValue({ salesQuotationTotal: 0 });
     }
    }
    else if(this.gstType === "interState"){
      //alert(igst)
      let cal1 = Math.round((subTotal / 100) * igst);
      if (!isNullOrUndefined(cal1)) {
        let totalAmt = +subTotal + +cal1;
         this.addSalesQuotation.patchValue({ salesQuotationTotal: totalAmt });
       } else {
         this.addSalesQuotation.patchValue({ salesQuotationTotal: 0 });
      }
    }

    // if(this.gstType == "local"){
    //   var sgst = $("#salesQuotationSgst").val();
    //   var cgst = $("#salesQuotationCgst").val();

    //  // alert(sgst);
    //   //alert(cgst)
     
    //   let totalAmt = cal1+cal2;

    //   //$("salesQuotationTotal").val(cal1+cal2);
    //   this.addSalesQuotation.patchValue({ salesQuotationTotal: totalAmt });
    // }
    



    // if(this.gstType == "local") {
    // let taxAmt = Math.round((subTotal / 100) * taxRate);
    // if (!isNullOrUndefined(taxAmt)) {
    //   let totalAmt = +subTotal + +taxAmt;
    //   this.addSalesQuotation.patchValue({ salesQuotationTotal: totalAmt });
    // } else {
    //   this.addSalesQuotation.patchValue({ salesQuotationTotal: 0 });
    // }
    // }
    
  }

  reset() {
    this.salesOrderArray = [];
    this.addRow();
  }

  itemParticularForm(): boolean {
    let itemName: any = [];
    let itemCode: any = [];
    let quantity: any = [];
    let unitPrice: any = [];
    let amount: any = [];
    let remarks: any = [];
    this.salesOrderArray.forEach((object, i) => {
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

    this.addSalesQuotation.patchValue({
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
