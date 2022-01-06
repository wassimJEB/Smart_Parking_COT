import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: '',

    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)

  },


  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuard]


  },
  {
    path: 'nfc-reader',
    loadChildren: () => import('./nfc-reader/nfc-reader.module').then( m => m.NfcReaderPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'sensor-details',
    loadChildren: () => import('./pages/sensor-details/sensor-details.module').then( m => m.SensorDetailsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'car-list',
    loadChildren: () => import('./pages/car-list/car-list.module').then( m => m.CarListPageModule),
    canActivate: [AuthGuard]
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
