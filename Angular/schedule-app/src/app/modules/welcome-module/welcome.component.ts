import {Component, OnDestroy, OnInit} from '@angular/core';
import {RootScopeService} from "@app/services/root-scope.service";

@Component({
	selector: 'welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy{
	title = 'app';

	constructor(private rootScope: RootScopeService){
		rootScope.isShowToolbar = false;
	}

	ngOnInit(){
		debugger;
		this.rootScope.isShowToolbar = false;
	}

	ngOnDestroy(){
		this.rootScope.isShowToolbar = true;
	}
}
