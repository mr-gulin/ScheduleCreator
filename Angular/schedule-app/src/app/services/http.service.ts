import {Component, Injectable, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class HttpService implements OnInit {

	constructor(private http: HttpClient){

	}

	ngOnInit(): void {
	}

	addBookWithObservable(): Observable<any> {
		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

		return this.http.post('http://agulin.com:8080/api/calc/users', {'head': 'head'}, {headers});
	}
}