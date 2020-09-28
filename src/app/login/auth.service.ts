import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { Observable } from 'rxjs/index';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  public readonly authState$: Observable<User | null> = this.afAuth.authState;

  constructor(
    public  afAuth:  AngularFireAuth, 
    public  router:  Router,
    private _snackBar: MatSnackBar) 
    {    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })
    }

    // Sign in with email/password
    public async login(email: string, password: string) {
      var result = await this.afAuth.signInWithEmailAndPassword(email, password).catch(
        e=>{
          console.log(e)
          this._snackBar.open('Wrong passwordor user', 'Error', {
            duration: 4000,
          });
        }
      )
      window.open("https://medium.com/", "_blank");
  }

   public async logout(){
      await this.afAuth.signOut();
      localStorage.removeItem('user');
      this.router.navigate(['']);
    }
}