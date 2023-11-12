import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { mapapi } from '../shared/iUrlpath';
import { BillingService } from './billing.service';
const _users_data = mapapi.USERS_data;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: string;
  public currentBranch: string;
  public currentEntity: string;
  public usersRight: string;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  readonly baseUrl = _users_data;
  //readonly baseUrl = 'http://localhost:50384/api/';

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    //   return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }

  login(formData) {
    //   return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
  }

  // getUserProfile() {
  //   return this.http.get(this.BaseURI + '/UserProfile');
  // }


  loginAPI2(username: string, password: string): Observable<any> {
    return this.http.get(this.baseUrl + username + '/' + password).pipe(
      switchMap((users) => {
        let user = users[0];
        if (user) {
          localStorage.setItem('BranchName', JSON.stringify(users[0].branch));
          //localStorage.setItem('AEname', JSON.stringify(users[0].firstname));
          localStorage.setItem('name', JSON.stringify(users[0].name));
          localStorage.setItem('entity', JSON.stringify(users[0].entity));
          localStorage.setItem('rights', JSON.stringify(users[0].userights));
          // this.currentBranch = user[0].branch.trim();
          // this.currentUser = user[0].user.trim();
          // this.currentEntity = user[0].entity.trim();

          return of(user);
        } else {
          return throwError('Unable to login');
        }
      })
    );
  }


  GetUserAPI(username: string): Observable<any> {
    return this.http.get(this.baseUrl + username).pipe(
      switchMap((users) => {
        let user = users[0];
        if (user) {
          localStorage.setItem('BranchName', JSON.stringify(users[0].branch));
          //localStorage.setItem('AEname', JSON.stringify(users[0].firstname));
          localStorage.setItem('name', JSON.stringify(users[0].name));
          localStorage.setItem('entity', JSON.stringify(users[0].entity));
          localStorage.setItem('rights', JSON.stringify(users[0].userights));

          this.currentBranch = users[0].branch;
          this.currentUser = users[0].name;
          this.currentEntity = users[0].entity;
          this.usersRight = users[0].rights;

          return of(user);
        } else {
          return throwError('Unable to login');
        }
      })
    );
    // this.billService.SelectedEntityChanged(this.currentBranch);
  }

  // loginAPI(username: string, password: string): Observable<any> {
  //   return this.http.post<boolean>(this.baseUrl + username + '/' + password).pipe(
  //     switchMap((users) => {
  //       let user = users[0];
  //       if (user) {
  //         localStorage.setItem('BranchName', JSON.stringify(users[0].branch));
  //         //localStorage.setItem('AEname', JSON.stringify(users[0].firstname));
  //         localStorage.setItem('name', JSON.stringify(users[0].name));
  //         localStorage.setItem('entity', JSON.stringify(users[0].entity));
  //         localStorage.setItem('rights', JSON.stringify(users[0].userights));
  //         return of(user);
  //       } else {
  //         return throwError('Unable to login');
  //       }
  //     })
  //   );
  // }
}
