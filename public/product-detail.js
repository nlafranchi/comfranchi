import {HttpClient,json} from 'aurelia-fetch-client';

export class ProductDetail {
	
	constructor() {
		this.client = new HttpClient();
		this.productImages = [];
	}
	
	saveProduct() {
		console.log('post request', this);
		let product = {
		  name: this.name,
		  price: this.price,
		  description: this.description,
		  images: this.productImages
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
	  	this.productId = response.productId;
	      console.log(response.productId);
	  });
  }
  
  filesSelected(event) {
  	console.log(event);
  	let fileList = event.srcElement.files;
    if (!fileList) {
      return;
    }
    for(let i = 0; i < fileList.length; i++) {
    	console.log(fileList)
      this.productImages.push(fileList.item(i));
    }
  }
}