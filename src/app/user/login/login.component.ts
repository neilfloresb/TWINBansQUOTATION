import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HorizontalAlignment, IgxDialogComponent, IgxToastComponent, IgxToastPosition, PositionSettings, VerticalAlignment } from 'igniteui-angular';
import { UserService } from 'src/app/service/user.service';
import * as forge from 'node-forge';
import { HttpClient } from '@angular/common/http';
import { mapapi } from 'src/app/shared/iUrlpath';
import { PublicKeysService } from 'src/app/shared/public-keys.service';


const _useracess = mapapi.UserAccess;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // publicKey: string = `-----BEGIN PUBLIC KEY-----
  //   MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAskgPKBcNpz71mi4NSYa5
  //   mazJrO0WZim7T2yy7qPxk2NqQE7OmWWakLJcaeUYnI0kO3yC57vck66RPCjKxWuW
  //   SGZ7dHXe0bWb5IXjcT4mNdnUIalR+lV8czsoH/wDUvkQdG1SJ+IxzW64WvoaCRZ+
  //   /4wBF2cSUh9oLwGEXiodUJ9oJXFZVPKGCEjPcBI0vC2ADBRmVQ1sKsZg8zbHN+gu
  //   U9rPLFzN4YNrCnEsSezVw/W1FKVS8J/Xx4HSSg7AyVwniz8eHi0e3a8VzFg+H09I
  //   5wK+w39sjDYfAdnJUkr6PjtSbN4/Sg/NMkKB2Ngn8oj7LCfe/7RNqIdiS+dQuSFg
  //   eQIDAQAB
  //   -----END PUBLIC KEY-----`;

  formModel = {
    UserName: '',
    Password: ''
  };

  public IsValid: boolean = false;


  constructor(private router: Router, private userservice: UserService, private _httpClient: HttpClient, private pubkey: PublicKeysService) {
  }

  @ViewChild('alert', { static: true }) public alert: IgxDialogComponent;
  @ViewChild('toast', { static: true }) public toast: IgxToastComponent;


  // @Input()
  public toastPosition: IgxToastPosition = IgxToastPosition.Bottom;
  // toast: any;


  public positionSettings: PositionSettings = {
    horizontalDirection: HorizontalAlignment.Center,
    verticalDirection: VerticalAlignment.Middle,
  };

  ngOnInit(): void {
    //    this._pubKey.publicKey;
  }

  onSubmit(form: NgForm) {
    // var rsa = forge.pki.publicKeyFromPem(this.publicKey);
    var rsa = forge.pki.publicKeyFromPem(this.pubkey.publicKey);
   // var encryptedPassword = window.btoa(rsa.encrypt(this.formModel.Password));
    var encryptedPassword = this.pubkey.encryptValue(this.formModel.Password);
    var payload = { "userid": this.formModel.UserName, "password": encryptedPassword };


    // LOGIN FUNCTION

    this._httpClient.post<boolean>(_useracess, payload).subscribe(res => {
      if (res) {
        this.IsValid = res;
        //GET USER INFO
        this.userservice.GetUserAPI(this.formModel.UserName).subscribe(
          (res) => {
            this.userservice.currentUser = this.formModel.UserName;
            localStorage.setItem('userName', JSON.stringify(this.formModel.UserName));
            this.router.navigateByUrl('/home');
          },
          // err => {
          //   if (err.status == 400)
          //     // this.toastr.error('Incorrect username or password.', 'Authentication failed.');
          //     this.toast.show();
          //   else
          //     //   console.log(err);
          //     this.toast.show();
          // }
        );
        // end usr info
      //  this.router.navigateByUrl('/home');
      } else {
        this.toast.show();
      }

    }, err => {
      console.error(err);
    });
    // END function

    // this.userservice.loginAPI(this.formModel.UserName, encryptedPassword).subscribe(
    //   (res) => {
    //     // localStorage.setItem('token', res);
    //     // console.log(res.user);
    //     this.userservice.currentUser = this.formModel.UserName;
    //     localStorage.setItem('userName', JSON.stringify(this.formModel.UserName));
    //     this.router.navigateByUrl('/home');
    //   },
    //   err => {
    //     if (err.status == 400)
    //       // this.toastr.error('Incorrect username or password.', 'Authentication failed.');
    //       this.toast.show();
    //     else
    //       //   console.log(err);
    //       this.toast.show();
    //   }
    // );
  }

}
