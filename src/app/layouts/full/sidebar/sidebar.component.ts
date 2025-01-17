import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from '../../../services/nav.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems = navItems;
  userData: any;

  constructor(public navService: NavService) {}

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
     if (this.userData.userType == 1) {
      this.navItems = [
        {
          navCap: 'Home',
        },

        {
          displayName: 'Catgeory',
          iconName: 'list',
          route: '/admin/categoryList',
        },
      ];
    }
  }
}
