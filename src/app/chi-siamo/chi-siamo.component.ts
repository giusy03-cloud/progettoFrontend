import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {HeaderComponent} from '../header/header.component';



@Component({
  selector: 'app-chi-siamo',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './chi-siamo.component.html',
  styleUrls: ['./chi-siamo.component.css']
})
export class ChiSiamoComponent {
  constructor() {
    console.log('ChiSiamoComponent loaded');
  }
}
