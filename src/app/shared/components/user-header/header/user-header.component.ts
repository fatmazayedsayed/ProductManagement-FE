import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.scss',
})
export class UserHeaderComponent implements OnInit {
  userData: any;
  constructor(private router: Router) {}
  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
  }
  onLogout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
