import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { MedecineService } from '../../medecine.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: []
})
export class DetailsComponent implements OnInit, OnChanges {

  @Input() medecineId = 0;
  private medecineDetails: any;
  @Input() exist: boolean = false;


  constructor(private medecineService: MedecineService) {
 }

  ngOnChanges() {

    this.medecineService.getMedecineDetails(this.medecineId).subscribe(
      (data)=> {
        this.medecineDetails=data[0];
      },
      (error)=> {
        console.error(error);
      }
    )
  }

  ngOnInit(){ }

}
