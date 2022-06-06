import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private _authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    if(this._authService.isLoggedIn()){
      this.router.navigate(['/home'])
    }
  }

}
