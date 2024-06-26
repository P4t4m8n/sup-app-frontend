import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  inject,
} from '@angular/core';

@Directive({
  selector: '[modal]',
})
export class ModelDirective implements OnInit {
  @Output() clickOutside = new EventEmitter();
  private el = inject(ElementRef);

  ngOnInit(): void {
    setTimeout(() => {
      this.onClick = (ev: MouseEvent) => {
     
        const isClickedInside = this.el.nativeElement.contains(ev.target);
        if (!isClickedInside) this.clickOutside.emit();
      };
    }, 0);
  }

  @HostListener('document:click', ['$event'])
  onClick: (ev: MouseEvent) => void = () => {};
  

}
