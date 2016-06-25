import {HttpClient,json} from 'aurelia-fetch-client';
import {LogManager} from 'aurelia-framework';
import {ConsoleAppender} from 'aurelia-logging-console';

LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.logLevel.info);

export class App {
  message = "ECONFRANKI";
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['products', ''],  name: 'products',  moduleId: './products',  nav: true, title:'Products' },
      { route: 'product-detail', name: 'product-detail',    moduleId: './product-detail',    nav: true, title:'Product-Detail' }
    ]);

    this.router = router;
  }
  
}