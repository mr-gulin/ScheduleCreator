import {Component, Injectable, OnInit} from '@angular/core';
import {Schedule} from "@app/modules/creator-module/classes/schedule.class";

@Injectable()
export class RootScopeService implements OnInit {

	private _isShowToolbar: boolean = true;

	ngOnInit(): void {
	}

	get isShowToolbar(): boolean {
		return this._isShowToolbar;
	}

	set isShowToolbar(value: boolean) {
		this._isShowToolbar = value;
	}
}