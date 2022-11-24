import { Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {
  @Input('appParallax') imageEl: any;
  headerHeight: any;
  children: any;
  moveImage: number | undefined;
  scaleImage: number | undefined;

  constructor(
    private renderer: Renderer2,
    private domCtrl: DomController
  ) { }

  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
    const scrollTop: number = $event.detail.scrollTop;

    if (scrollTop > 0) {
      this.moveImage = scrollTop/1.6;
      this.scaleImage = 1
    }else {
      this.scaleImage = -scrollTop / 200 + 1;
      this.moveImage = scrollTop / 1.6;
    }

    this.domCtrl.write(() => {
      this.renderer.setStyle(
        this.imageEl, 'webkitTansform', 'translate3d(0,' + this.moveImage + 'px, 0) scale(' + this.scaleImage + ',' + this.scaleImage +')'
      )
    });
  }
  // header(header: any, arg1: string, arg2: string) {
  //   throw new Error('Method not implemented.');
  // }

}
