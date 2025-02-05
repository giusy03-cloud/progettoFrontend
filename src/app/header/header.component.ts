import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { initializeImageSlider } from '../../assets/imageSlider';
import{ChiSiamoComponent} from '../chi-siamo/chi-siamo.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {



  title = 'DESPERATION VACATION';
  icon: string= 'fas fa-cocktail';

  constructor() {}

  ngAfterViewInit() {
    // Esegui solo nel browser
    initializeImageSlider();



  }
}
