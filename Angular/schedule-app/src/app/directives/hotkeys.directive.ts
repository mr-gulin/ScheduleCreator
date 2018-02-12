import {Directive, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output} from "@angular/core";

@Directive({
	selector: '[hotkeyListener]'
})
export class HotkeysDirective {

	@Output() ctrlEnter = new EventEmitter();
	@Output() shiftEnter = new EventEmitter();
	@Output() ctrlShiftEnter = new EventEmitter();
	@Output() enter = new EventEmitter();

	constructor(private elRef: ElementRef) {
	}

	@HostListener('keypress', ['$event'])
	keyPress(event: KeyboardEvent) {
		debugger;
		if (!event.shiftKey && event.ctrlKey && event.keyCode == 10){
			this.ctrlEnter.emit();
		}
		if (!event.ctrlKey && event.shiftKey && event.keyCode == 13){
			this.shiftEnter.emit();
		}
		if (event.ctrlKey && event.shiftKey && event.keyCode == 10){
			this.ctrlShiftEnter.emit();
		}
		if (!event.ctrlKey && !event.shiftKey && event.keyCode == 13){
			this.enter.emit();
		}
	}


}