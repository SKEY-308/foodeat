import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';

// import Swiper core and required modules
import SwiperCore, { FreeMode, Pagination } from "swiper";

// install Swiper modules
SwiperCore.use([FreeMode, Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class HomePage implements OnInit {
  categories: any = [];
  highlights: any = [];
  featured:any = [];

  catSlideOpts={
    freeMode: true,
    slidesPerView: 3.2,
    slidesOffsetBefore: 11,
    spaceBetween: 8
  }

  highlighSlideOpts={
    slidesPerView: 1.05,
    spaceBetween: 10,
    centeredSlides: true,
    loop: true
  }

  featuredSlideOpts={
    slidesPerView: 1.05,
    spaceBetween: 5,
    loop: true,
    centeredSlides: true,
    // freeMode: true,
  }

  constructor(private http: HttpClient) {}


  ngOnInit() {
    this.http.get('https://devdactic.fra1.digitaloceanspaces.com/foodui/home.json').subscribe((res: any)=> {
      console.log(res)

      this.categories = res.categories;
      this.highlights = res.highlights;
      this.featured = res.featured;
      console.log(this.categories)
      console.log(this.highlights)
      console.log(this.featured)

    } );

    // console.log(this.categories)
  }

  doRefresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).target.complete();
    }, 1000);
  }

  showLocationDetail = false;

  onScroll(ev: any){
    const offset = ev.detail.scrollTop;
    this.showLocationDetail = offset > 50;
  }

}

// function doRefresh(ev: any, any: any) {
//   throw new Error('Function not implemented.');
// }

