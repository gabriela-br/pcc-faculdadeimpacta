import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'PCC-ReservadeSalas';
  showNavBar: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavBar = true;
        this.showNavBar = this.showNavBar && event.url !== '/';
        this.showNavBar = this.showNavBar && event.url !== '/login';
        this.showNavBar = this.showNavBar && event.url !== '/register';
      }
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
