
import {HttpClient,json} from 'aurelia-fetch-client';
import {inject, bindable} from 'aurelia-framework';
import {Const} from './resources/constants';

export class ProductDetail {
	
	constructor() {
		this.client = new HttpClient();
		this.productImages = [];

	}

	activate(params) {

		if (params.id) {
     this.getProductDetail(params.id).then((response) => console.log(response));
		} else {
			
		}
	}
	
	getProductDetail(id) {
  	return this.client.fetch(`products/${id}`)
          .then(response => response.json())
          .then(product => this.product = product[0]);
	}
	saveProduct() {
		let http_method = 'put';
		if (this.product._id) {
			http_method = 'post';
		}
		this.client.fetch('products', {
		  method: http_method,
		  body: JSON.stringify(this.product),
		  headers: {
			  'Content-Type': 'application/json',
			  'Accept': 'application/json'
			}
		})
		.then(response => response.json())
	  .then(response => {

	  	this.productId = response.productId;
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