import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  //images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  images = ["assets/images/colchon_2.jpeg", "assets/images/colchon_3.jpeg", "assets/images/electro_1.jpeg"];
  constructor() { }

  ngOnInit() {
  }

}
