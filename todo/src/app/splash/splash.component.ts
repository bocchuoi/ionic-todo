import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {

  showSplash = true; 

  constructor(private router: Router) { }

  ngOnInit() {
    
    setTimeout(() => {
      this.showSplash = false;
      this.router.navigate(['/home']);
    }, 3000); 
    
  }
}
