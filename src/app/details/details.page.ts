import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonContent, IonList, IonSlides, isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, AfterViewInit {
  data: any= null;

  opts = {
    freeMode: true,
    slidesPerView: 2.6,
    slidesOffsetBefore: 30,
    slidesOffsetAfter: 100
  }

  categorySlidesVisible = false;

  activeCategory = 0;
  @ViewChildren(IonList, {read: ElementRef}) lists: QueryList <ElementRef> | undefined;
  listElements: any = [];
  @ViewChild(IonContent) content!: IonContent;
  @ViewChild(IonSlides) slides!: IonSlides;

  constructor(private http: HttpClient,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.http.get('https://devdactic.fra1.digitaloceanspaces.com/foodui/1.json').subscribe((res: any)=> {
      this.data = res;
      console.log(this.data)
    })

    const headerHeight = isPlatform('ios') ? 44 : 56;
    this.document.documentElement.style.setProperty('--header-position', `calc (env (safe-area-inset-top) + $ {headerHeight}px) ` )
  }

  ngAfterViewInit(): void {
    this.lists?.changes.subscribe( _=> {
      this.listElements = this.lists?.toArray();
  } )
  }

  selectCategory(index: any){
    const child =this.listElements[index].nativeElement;
    this.content?.scrollToPoint(0, child.offsetTop - 120, 1000);
  }

  onScroll(ev: any){
    const offset = ev.detail.scrollTop;
    this.categorySlidesVisible = offset > 500;

    for(let i = 0; i  < this.listElements.length; i++){
       const item = this.listElements[i].nativeElement;
       if(this.isElementInViewport(item)){
        this.activeCategory = i;
        this.slides.slideTo(i, 1000);
        break;
       }
    }
  }

  isElementInViewport(el: { getBoundingClientRect: () => any; }){
    const rect = el.getBoundingClientRect();

    return(
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || this.document.documentElement.clientHeight)
    )
  }

}
