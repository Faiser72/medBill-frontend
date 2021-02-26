import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { SalesOrderService } from "src/app/service/salesOrder/sales-order.service";
import { StockService } from "src/app/service/stock/stock.service";
import { isNullOrUndefined } from "util";
declare var $: any;

class salesOrder {
  productType: any;
  productName: any;
  manufacturer: any;
  quantity: any;
  unitPrice: any;
  batchNumber: any;
  manufactureDate: any;
  expiryDate: any;
  amount: any;
  stockItemId: any;
}
@Component({
  selector: "app-add-sales",
  templateUrl: "./add-sales.component.html",
  styleUrls: ["./add-sales.component.scss"],
})
export class AddSalesComponent implements OnInit {
  salesOrderArray: Array<salesOrder> = [];
  salesOrder: any = {};
  addSalesOrder: FormGroup;
  stockList: any;
  // allProductList: any;
  remainingQuantity: any;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private appComponent: AppComponent,
    private salesOrderService: SalesOrderService,
    private stockService: StockService
  ) {
    this.addSalesOrderFormBuilder();
  }

  ngOnInit() {
    // for multile contact form starts
    this.salesOrder = {
      productType: "",
      productName: "",
      manufacturer: "",
      quantity: "",
      unitPrice: "",
      batchNumber: "",
      manufactureDate: "",
      expiryDate: "",
      amount: "",
    };
    this.salesOrderArray.push(this.salesOrder);
    // for multile contact form ends

    this.getSalesOrderInvoiceNumber();
    this.getAllStocks();
  }

  getSalesOrderInvoiceNumber() {
    this.salesOrderService
      .getSalesInvoiceNumberAuto()
      .subscribe((data: any) => {
        this.addSalesOrder.patchValue({ invoiceNumber: data.object });
      });
  }

  getAllStocks() {
    this.stockService.getStockItemList().subscribe((data: any) => {
      this.stockList = data.listObject;
    });
  }
  allProductList = [];
  getProductListUsingCategoryId(id: any, i) {
    this.salesOrderService.getPrductsByCategoryId(id).subscribe((data: any) => {
      this.allProductList[i] = data.listObject;
    });
  }

  addSalesOrderFormBuilder() {
    this.addSalesOrder = this.fb.group({
      customerName: [
        "",
        [Validators.required, Validators.pattern(/^[A-Za-z]+$/)],
      ],
      invoiceNumber: ["", Validators.required],
      doctorName: [
        "",
        [Validators.required, Validators.pattern(/^[A-Za-z]+$/)],
      ],
      salesDate: ["", Validators.required],
      subTotal: [""],
      sgstAmount: [
        "",
        [Validators.required, Validators.pattern(/^[1-9]\d*(\.\d+)?$/)],
      ],
      cgstAmount: [
        "",
        [Validators.required, Validators.pattern(/^[1-9]\d*(\.\d+)?$/)],
      ],
      paymentMode: ["", Validators.required],
      totalNetAmount: [""],
      salesOrderList: "",
    });
  }

  public matchProducts = (productName, value): boolean => {
    if (value) {
      return productName.productName.productId === value.productName.productId;
    }
  };

  addRow() {
    this.salesOrder = {
      productType: "",
      productName: "",
      manufacturer: "",
      quantity: "",
      unitPrice: "",
      batchNumber: "",
      manufactureDate: "",
      expiryDate: "",
      amount: "",
    };
    this.salesOrderArray.push(this.salesOrder);
    this.validateSalesOrderDetails(-1);
    return true;
  }

  salesOrderDetailsFlag: boolean = false;
  validateSalesOrderDetails(i: number) {
    this.salesOrderDetailsFlag = false;
    if (i > -1) {
      this.productTypeRow(this.salesOrderArray[i].productType, i);
      this.productNameRow(this.salesOrderArray[i].productName, i);
      this.quantityRow(this.salesOrderArray[i].quantity, i);
      this.unitPriceRow(this.salesOrderArray[i].unitPrice, i);
    }
    this.salesOrderArray.every((object, index) => {
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
        this.salesOrderDetailsFlag = true;
        return true;
      } else {
        this.salesOrderDetailsFlag = false;
        return false;
      }
    });
    return this.salesOrderDetailsFlag;
  }

  productTypeRow(productTypeValue: any, i: number) {
    if (productTypeValue != "") {
      document.getElementById("productTypeMsg" + i).innerHTML = "";
      this.getProductListUsingCategoryId(
        productTypeValue.productType.categoryId,
        i
      );
      //this.salesOrderArray[i].itemCode = productTypeValue.itemCode;
      //this.salesOrderArray[i].unitPrice = productTypeValue.itemUnitPrice;
      // (<HTMLInputElement>document.getElementById("itemCode" + i)).value = productTypeValue.itemCode;
      // (<HTMLInputElement>document.getElementById("unitPrice" + i)).value = productTypeValue.itemUnitPrice;
      return true;
    } else {
      if (!isNullOrUndefined(document.getElementById("productTypeMsg" + i))) {
        document.getElementById("productTypeMsg" + i).innerHTML =
          "Please select this option.";
      }
      return false;
    }
  }

  productNameRow(productNameValue: any, i: number) {
    if (productNameValue != "") {
      document.getElementById("productNameMsg" + i).innerHTML = "";
      this.remainingQuantity = productNameValue.balanceQuantity;
      this.salesOrderArray[i].manufacturer =
        productNameValue.productName.manufacturer.manufacturerName;
      this.salesOrderArray[i].batchNumber = productNameValue.batchNumber;
      this.salesOrderArray[i].unitPrice = productNameValue.unitPrice;
      this.salesOrderArray[i].manufactureDate =
        productNameValue.manufactureDate;
      this.salesOrderArray[i].expiryDate = productNameValue.expiryDate;
      this.salesOrderArray[i].stockItemId = productNameValue;
      return true;
    } else {
      if (!isNullOrUndefined(document.getElementById("productNameMsg" + i))) {
        document.getElementById("productNameMsg" + i).innerHTML =
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
        if (this.remainingQuantity < quantityValue) {
          document.getElementById("quantityMsg" + i).innerHTML = "No stock";
          return false;
        }
        this.remainingQuantity = this.remainingQuantity - quantityValue;
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
    this.addSalesOrder.patchValue({
      subTotal: subTotal,
    });

    let sgst = this.addSalesOrder.get("sgstAmount").value;
    let cgst = this.addSalesOrder.get("cgstAmount").value;

    if (!isNullOrUndefined(sgst) && !isNullOrUndefined(cgst)) {
      this.calculateTotalAmount(subTotal, sgst, cgst);
    } else {
      this.addSalesOrder.patchValue({ sgstAmount: 0, cgstAmount: 0 });
      this.calculateTotalAmount(subTotal, sgst, cgst);
    }
  }

  deleteRow(index: any) {
    if (this.salesOrderArray.length == 1) {
      return false;
    } else {
      this.salesOrderArray.splice(index, 1);
      this.validateSalesOrderDetails(-1);
      return true;
    }
  }

  calculateTotalAmount(subTotal, sgst, cgst) {
    let cal1 = Math.round((subTotal / 100) * sgst);
    let cal2 = Math.round((subTotal / 100) * cgst);
    let taxAmt = cal1 + cal2;
    if (!isNullOrUndefined(cal1) && !isNullOrUndefined(cal2)) {
      let totalAmt = +subTotal + +taxAmt;
      this.addSalesOrder.patchValue({ totalNetAmount: totalAmt });
    } else {
      this.addSalesOrder.patchValue({ totalNetAmount: 0 });
    }
  }

  reset() {
    this.salesOrderArray = [];
    this.addRow();
  }

  addSalesOrderFormSubmit() {
    if (this.salesOrderDetailsFlag && this.addSalesOrder.valid) {
      this.appComponent.startSpinner("Saving data..\xa0\xa0Please wait ...");
      this.addSalesOrder.patchValue({ salesOrderList: this.salesOrderArray });
      this.salesOrderService
        .addSalesOrderDetails(this.addSalesOrder.value)
        .subscribe(
          (resp: any) => {
            if (resp.success) {
              alert(resp.message);
              this.appComponent.stopSpinner();
              setTimeout(() => {
                if (confirm("Do you want add more Item ?")) {
                  location.reload();
                } else {
                  //this.backToSalesOrderList();
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

  backToSalesOrderList() {
    this.route.navigate(["/home/salesHome/listSales"]);
  }
}
