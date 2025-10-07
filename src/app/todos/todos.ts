import { Component } from '@angular/core';
import { TodosService } from '../shared/services/todos-service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Todo } from '../shared/models/todos.model';
@Component({
  selector: 'app-todos',
  imports: [CdkDropList, CdkDrag],
  templateUrl: './todos.html',
  styleUrl: './todos.scss'
})
export class Todos {

  // todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  // done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      if (event.container.id === 'doneList') {
        event.container.data[event.currentIndex];
        console.log("hello",)
      } else {
        console.log("no",event.container.data[event.currentIndex])
        ;
      }

    }
  }
  constructor(public todosService : TodosService){}

  ngOnInit(): void {
    this.todosService.getTodosList();
  }


  
}
