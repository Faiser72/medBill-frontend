import { Component, OnInit, Inject, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { AuthenticationService } from "src/app/service/authentication/authentication.service";
import { DefaultService } from "src/app/service/default/default.service";
import { SpinnerService } from "src/app/service/spinner/spinner.service";


@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"],
})
export class DefaultComponent implements OnInit {
  // sideBarOpen = true;
  // sideBarOpen=false;
  sideBarOpen;
  isSmallMobileDevice: MediaQueryList = window.matchMedia("(max-width: 599px)")
  isLoggedIn = false;
  loggedUser: string = '';
  showSpinner: boolean;
  hasBackValue: boolean = true;

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private spinnerService: SpinnerService,
    private authenticationService: AuthenticationService,
    private defaultService: DefaultService
  ) {
    if (!this.isSmallMobileDevice.matches) {
      this.sideBarOpen = true;
      this.hasBackValue = true;
    }
    else {
      this.sideBarOpen = false;
      this.hasBackValue = false;
    }
  }

  hasBack() {
    if (!this.isSmallMobileDevice.matches) {
      return this.hasBackValue = false;
    }
    else {
      return this.hasBackValue = true;
    }
  }

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    if (!this.isLoggedIn) {
      this.router.navigateByUrl('/login');
    } else {
      this.loggedUser = this.authenticationService.getLoggedUser();
      console.log("Hi, " + this.loggedUser + "! Welcome, to CMS Home.");
    }
  }

  switchMode(isDarkMode: boolean) {
    const hostClass = isDarkMode ? "theme-dark" : "theme-light";
    localStorage.setItem('theme', hostClass);
    let theme_local = localStorage.getItem('theme');
    this.renderer.setAttribute(this.document.body, "class", theme_local);
    // this.isDark = isDarkMode;
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
