import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medecine-info',
  templateUrl: './medecine-info.component.html',
  styles: []
})
export class MedecineInfoComponent implements OnInit {

  private medecineSelected: number = 0;
  private showDetails: boolean = false;


  constructor() { }

  ngOnInit() {
  }

  showMedecine(id){
    this.medecineSelected = id;
    this.showDetails = true;
  }

}
