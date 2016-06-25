import {HttpClient,json} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(Router)
export class Products {
	constructor(router) {
		this.client = new HttpClient();
		this.products = [];
		this.getProducts();
		this.router = router
	}
	getProducts() {
  	this.client.fetch('products').then(response => response.json()).then(response => {
  		this.products = response;
  	});
  }
}