import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  createTask: EventEmitter<string> = new EventEmitter<string>();

  onCreate(val:string  ){
    this.createTask.emit(val);
  }

  

}
