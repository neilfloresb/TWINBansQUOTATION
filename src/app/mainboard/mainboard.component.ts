import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IgxNavigationDrawerComponent } from 'igniteui-angular';
import { NavigationEntry, PATHS } from './nav-drawer.data';
import { Location } from '@angular/common';


@Component({
  selector: 'app-mainboard',
  templateUrl: './mainboard.component.html',
  styleUrls: ['./mainboard.component.scss']
})
export class MainboardComponent implements OnInit {
  public navMenu: NavigationEntry[];
  public navItems: NavigationEntry[];
  public selected = "Home";
  public currentNavChain = ["Home"];

  currentUser;

  public drawerState = {
    miniTemplate: false,
    open: true,
    pin: true
  };

  constructor(private router: Router, private location_: Location) { }

  ngOnInit(): void {

    const userName = JSON.parse(localStorage.getItem('userName'));

    this.currentUser = userName;
    this.navMenu = PATHS;
    this.navItems = this.navMenu.slice();
  }

  @ViewChild(IgxNavigationDrawerComponent, { static: true })
  public drawer: IgxNavigationDrawerComponent;

  public navigate(item) {

    if (item.collapsed !== undefined) {
      item.collapsed = !item.collapsed;
    }
    if (item.children === undefined) {
      const link = item.link;
      this.selected = item.text;
      this.router.navigate([link]);
    }
  }

  public actionExc(event) {
    alert('Action Execute!');
  }

  public navigateBack() {
    this.location_.back();
    //   //alert('Action GOback!');
  }
  public canGoBack() {
    return window.history.length > 0;
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('BranchName');
    //  this.router.navigate(['/user/login']);
  }
}
