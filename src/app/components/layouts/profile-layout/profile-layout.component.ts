import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.scss']
})
export class ProfileLayoutComponent implements OnInit {

  pagesWithRightMenu:string[] = ['settings', 'notifications', 'authors-quoters'];

  constructor(
    private router:Router,
  ) { }

  ngOnInit(): void {
  }

  showMenu():boolean {
    return !!this.pagesWithRightMenu.find(element =>(`/profile/${element}` === this.router.url));
  }

}
