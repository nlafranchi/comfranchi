import {HttpClient,json} from 'aurelia-fetch-client';


export class ProductDetail {
	constructor() {
		this.client = new HttpClient();
	}
	saveProduct() {

		console.log('post request', this);
		let product = {
		  name: this.name,
		  price: this.price,
		  description: this.description,
		  image: this.productImg
		};
		console.log('products-detail: ', product);
		this.client.fetch('products', {
		  method: 'put',
		  body: JSON.stringify(product),
		  headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
		})
		 .then(response => response.json())
    .then(response => {
    //  this.apiKey = response.APIKey;
      console.log(response);
    });
  }
  getContacts() {
  	this.client.fetch('products').then(response => response.json()).then(data => {
  		console.log(data.name);
  	});
  }
}