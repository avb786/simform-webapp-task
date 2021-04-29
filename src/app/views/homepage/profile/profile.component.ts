import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profileData: any;
  constructor(
    public _auth: AuthService
  ) { }

  async ngOnInit() {
    this.profileData = await this._auth.getUserDetails();
  }

}
