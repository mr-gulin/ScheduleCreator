import {
	AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit,
	Output
} from "@angular/core";

@Directive({
	selector: '[focusFirst]'
})
export class FocusFirstDirective implements AfterViewInit {

	@Input('focusFirst') isOnlyEmptyFocusEnabled = true;

	constructor(private elRef: ElementRef) {
	}

	ngAfterViewInit() {
		setTimeout(() =>{
			if (this.elRef){
			if (this.isOnlyEmptyFocusEnabled && this.elRef.nativeElement && !this.elRef.nativeElement.value) {
				this.elRef.nativeElement.focus();
			} else {
			if (!this.isOnlyEmptyFocusEnabled && this.elRef.nativeElement && this.elRef.nativeElement.value){
				this.elRef.nativeElement.focus();
			}
		}
		}
		});

	}
}
