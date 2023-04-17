
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SplashComponent } from './splash/splash.component';

@Injectable()
export class SplashGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private splashComponent: SplashComponent) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkSplashVisibility();
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkSplashVisibility();
  }

  private checkSplashVisibility(): boolean {
    if (this.splashComponent.showSplash) {
      // If splash screen is still visible, prevent navigation
      return false;
    }
    return true;
  }

}
