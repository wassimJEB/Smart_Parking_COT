import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',

    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)



  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
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
    //loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: 'nfc-reader',
    loadChildren: () => import('./nfc-reader/nfc-reader.module').then( m => m.NfcReaderPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
