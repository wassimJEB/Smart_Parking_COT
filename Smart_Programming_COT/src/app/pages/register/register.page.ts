
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import  {ToastService}  from '../../services/toast.service';
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
    password: '',
    role:''
    };
  constructor(private authService: AuthService,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit() {
  }
  registerAction() {
     console.log(this.postData.role);

    const Result = document.getElementById('res');
     this.authService.register(this.postData).subscribe(async res=> {
         console.log(res.postData);
         await this.toastService.presentToast('Account created successfully!')
         this.router.navigate(['/login']);


         }, async err=>{
       console.log(err);
       await this.toastService.presentToast('There was a problem while creating the account!')

       }
     );

  }

}
