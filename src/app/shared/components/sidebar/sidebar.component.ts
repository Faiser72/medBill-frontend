import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  currentUserAvatar;
  currentUserName;
  placeholder_path: string = "assets/imgs/vitamin.png";
  userId: any;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }


  /* for submenu Start here... */
  showOrderSubmenu: boolean = false;
  showMasterSubmenu: boolean = false;
  showReportSubmenu: boolean = false;



  toggleOrderSubmenu(submenu: string) {
    let element = document.getElementById(submenu);
    if (element.style.display == '' || element.style.display == 'none') {
      element.style.display = 'block';
    }
    else {
      element.style.display = 'none';
    }
  }

  toggleMasterSubmenu(submenu: string) {
    let element = document.getElementById(submenu);
    if (element.style.display == '' || element.style.display == 'none') {
      element.style.display = 'block';
    }
    else {
      element.style.display = 'none';
    }
  }

  toggleReportSubmenu(submenu: string) {
    let element = document.getElementById(submenu);
    if (element.style.display == '' || element.style.display == 'none') {
      element.style.display = 'block';
    }
    else {
      element.style.display = 'none';
    }
  }
  /* Ends here. */

}
