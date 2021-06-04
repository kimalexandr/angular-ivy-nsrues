import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
   console.log(this.registryIcons());
   
   }

  ngOnInit(): void {
  }

  registryIcons() {
    this.matIconRegistry.addSvgIcon(
      `icon-1`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/vk2.svg")
    );
    // this.matIconRegistry.(
    //   `icon-2`,
    //   this.domSanitizer.bypassSecurityTrustResourceUrl("assets/vk.png")
    // );
    // this.matIconRegistry.addSvgIcon(
    //   `icon-3`,
    //   this.domSanitizer.bypassSecurityTrustResourceUrl("assets/images/icon-3.svg")
    // );
  }

}
