import {Directive, ElementRef, EventEmitter, Input, OnChanges, Output} from "@angular/core";

@Directive({
	selector: '[contenteditableModel]',
	host: {
		'(blur)': 'onBlur()'
	}
})
export class ContentEditableDirective implements OnChanges {
	@Input('contenteditableModel') model: any;
	@Output('contenteditableModelChange') update = new EventEmitter();

	private lastViewModel: any;


	constructor(private elRef: ElementRef) {
	}

	ngOnChanges(changes: any) {
		//if (isPropertyUpdated(changes, this.lastViewModel)) {
			this.lastViewModel = this.model;
			this.refreshView();
		//}
	}

	onBlur() {
		const value = this.elRef.nativeElement.innerText;
		this.lastViewModel = value;
		this.update.emit(value);
	}

	private refreshView() {
		this.elRef.nativeElement.innerText = this.model;
	}
}