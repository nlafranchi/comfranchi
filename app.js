import {HttpClient,json} from 'aurelia-fetch-client';
import {LogManager} from 'aurelia-framework';
import {ConsoleAppender} from 'aurelia-logging-console';

LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.logLevel.info);



export class App {
  message = "ECONFRANKI";
  
}