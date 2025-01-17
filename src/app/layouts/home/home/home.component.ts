import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashBoardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  userData: any;
  dashboardData: any;
  constructor(private router: Router,
        private _dasboard: DashBoardService,
    
  ) {}
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this._dasboard.getDashBoardData().subscribe((response: any) => {
      this.dashboardData=(response.data)
     })}

  onLogout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
