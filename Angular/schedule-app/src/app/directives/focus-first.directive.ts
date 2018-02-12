import {
	AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit,
	Output
} from "@angular/core";

@Directive({
	selector: '[focusFirst]'
})
export class FocusFirstDirective implements AfterViewInit {

	constructor(private elRef: ElementRef) {
	}

	ngAfterViewInit() {
		setTimeout(() =>{
			if (this.elRef) {
				this.elRef.nativeElement.focus();
			}
		});

	}
}