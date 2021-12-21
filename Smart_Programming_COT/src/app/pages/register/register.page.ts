
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { ToastService } from './../../services/toast.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  postData = {
    forename : '',
    surname :'',
    email: '',
    username: '',
    password: ''
    };
  constructor(private authService: AuthService,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit() {
  }
  registerAction() {
     //console.log(this.postData);
     this.authService.register(this.postData).subscribe(
       res=> {
         console.log('Created mel front ');
         console.log(res.postData);
         this.router.navigate(['Login'])

         },
       err=>console.log(err)
     );

  }
      /*
    this.authService.signup(this.postData).subscribe(
    (res: any) => {
    if (res.userData) {
    // Storing the User data.
    this.storageService
    .store(this.AUTH, res.userData)
    .then(res => {
    this.router.navigate(['settings']);
    });
    } else {
    this.toastService.presentToast(
    'Data alreay exists, please enter new details.'
    );
    }
    },
    (error: any) => {
    this.toastService.presentToast('Network Issue.');
    }
    );

    }*/
}
