import { Component } from '@angular/core';
import { TodosService } from '../shared/services/todos-service';

@Component({
  selector: 'app-todos',
  imports: [],
  templateUrl: './todos.html',
  styleUrl: './todos.scss'
})
export class Todos {
  constructor(public todosService : TodosService){}
  ngOnInit(): void {
    this.todosService.getTodosList();
  }
}
