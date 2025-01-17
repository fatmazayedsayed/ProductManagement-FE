import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  userData: any;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
  }

  onLogout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
