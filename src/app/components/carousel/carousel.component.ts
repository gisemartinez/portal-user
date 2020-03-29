import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  images = ["assets/images/image_1.webp", "assets/images/image_2.webp", "assets/images/image_3.webp"];
  constructor() { }

  ngOnInit() {
  }

}
