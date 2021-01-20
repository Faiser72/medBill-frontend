import { Component, OnInit, Output, EventEmitter, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { MatSlideToggleChange, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AuthenticationService } from "src/app/service/authentication/authentication.service";


//for popup forgotpassword
export interface DialogData {
  email: any;
}
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  one = "primary";

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  @Output()
  readonly darkModeSwitched = new EventEmitter<boolean>();

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog) { }

  onDarkModeSwitched({ checked }: MatSlideToggleChange) {
    this.darkModeSwitched.emit(checked);
  }

  ngOnInit() { }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }

  themes0() {
    this.one = "primary";
  }

  themes1() {
    this.one = "accent";
  }

  themes2() {
    this.one = "dark";
  }

  themes3() {
    this.one = "warn";
  }

  themes(): string {
    return this.one;
  }

  routeToChangePassword() {
    this.router.navigate(['home/changepassword'])
  }

  doLogout() {
    if (this.authenticationService.logout()) {
      this.router.navigateByUrl('/login');
    } else {
      location.reload();
    }
  }



  //for popup aboutuser  popup
  openDialog(): void {
    const dialogRef = this.dialog.open(AboutUser, {
      width: "500px",
      height: "500px"
      // data: { email: this.email },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log('The dialog was closed');
      // this.email = result;
    });
  }
}


//PopUp of About User popup
@Component({
  selector: "aboutuser",
  templateUrl: "aboutuser.html",
  styleUrls: ["./header.component.scss"]
})
export class AboutUser {
  constructor(
    public dialogRef: MatDialogRef<AboutUser>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,

  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}