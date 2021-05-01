import { Component, EventEmitter, Output } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {RegisterComponent} from '../register/register.component';
import {LoginService} from '../services/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Session } from '../interfaces/User';
import { SessionService } from '../services/session.service';
import { SessionSettings } from '../interfaces/session';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading = false;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern(/^[\S]+$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  @Output() sessionChanged = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private sessionService: SessionService
  ) { }

  getUsernameErrorMessage(): string {
    if (this.loginForm.controls.username.hasError('required')) {
      return 'Pflichtfeld';
    }
    return this.loginForm.controls.username.hasError('pattern') ? 'Der Benutzername enthällt Leerzeichen' : '';
  }

  getPasswordErrorMessage(): string {
    if (this.loginForm.controls.password.hasError('required')) {
      return 'Pflichtfeld';
    }
    return this.loginForm.controls.password.hasError('minlength') ? 'Passwort zu kurz!' : '';
  }

  openRegisterDialog(): void {
    const registerDialog = this.dialog.open(RegisterComponent, {
      disableClose: true,
      hasBackdrop: true,
      minWidth: '40%',
      restoreFocus: true
    });
    registerDialog.afterClosed().subscribe(
      data => this.loginForm.controls.username.setValue(data)
    );
  }

  performLogin(): void {
    this.loading = true;
    this.loginForm.disable();
    this.loginService.performLogin(
      this.loginForm.controls.username.value,
      this.loginForm.controls.password.value
    ).subscribe(
      (result: string) => {
        //TODO: Remove parse when backend delivers json object
        let session: Session = JSON.parse(result)
        this.sessionService.setSession(session, this.loginForm.controls.username.value);
        this.loading = false;
        this.loginForm.enable();
        this.snackBar.open('Login erfolgreich', '', { duration: 5000 });
        this.sessionChanged.emit();
      },
      () => {
        //TODO: Check for error type -> wrong username/pw
        this.loading = false;
        this.loginForm.enable();
        this.snackBar.open('Login nicht möglich', '', { duration: 5000 });
      },
    );
  }
}
