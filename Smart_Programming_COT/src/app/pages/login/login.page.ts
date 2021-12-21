import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './../../services/storage.service';
import { AuthService } from './../../services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  postData = {
    username: '',
    password: '',
    accessToken: ''
    };

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }
// Validation of input (nonempty)
  validateInputs() {
    const username = this.postData.username.trim();
    const password = this.postData.password.trim();
    return (
    this.postData.username &&
    this.postData.password &&
    username.length > 0 &&
    password.length > 0
    );
    }


    loginAction() {
      if (this.validateInputs()) {
        console.log(this.postData);
        this.authService.login(this.postData).subscribe((res: any) => {
          if (res.userData) {
            // Storing the User data.
            //this.storageService.store('userData', res.userData),res.accessToken;

            //this.router.navigate(['/settings']);
          } else {
            this.toastService.presentToast('Incorrect username and password.');
    }
        },(error: any) => {
          this.toastService.presentToast('Network Issue.');
          });
        } else {
          this.toastService.presentToast('Please enter email/username or password.');
        }
      }
      }
