
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
     this.authService.register(this.postData).subscribe(res=> {

         this.router.navigate(['/login']);
         this.toastService.presentToast('Account created successfully!').then(

         )



         }, err=>{
       console.log(err);
       this.toastService.presentToast('There was a problem while creating the account!')

       }
     );

  }

}
