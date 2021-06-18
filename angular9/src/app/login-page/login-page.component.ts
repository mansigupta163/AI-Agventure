import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  isPublic;

  @Input() public latitude: number;
  @Input() public longitude: number;

  constructor(private router: Router) {
    this.isPublic = true;
  }

  ngOnInit(): void { }

  public async goToDashboard() {
    await this.router.navigate([`/dashboard`]);
  }
}
