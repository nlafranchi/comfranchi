import {HttpClient,json} from 'aurelia-fetch-client';

export class Products {
	constructor() {
		this.client = new HttpClient();
		this.products = [];
		this.getContacts();
	}
	getProducts() {
  	this.client.fetch('products').then(response => response.json()).then(response => {
  		console.log('products: ', response);
  		this.products = response;
  	});
  }
}