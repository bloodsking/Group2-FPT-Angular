import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ProductAddComponent } from '../../../pages/product/product-add/product-add.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-demo';
  constructor(public router:Router) {}

  isLoginPage(): boolean {
    console.log(this.router.url);
    return this.router.url === '/login';
  }
}
