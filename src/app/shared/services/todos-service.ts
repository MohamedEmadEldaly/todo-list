import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Todo, TodosResponse } from '../models/todos.model';
import { endpointApi } from '../enums/endpoints.enum';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  constructor(private http : HttpClient){}
  todosList = signal<Todo[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  getTodosList(){
    this.http.get<TodosResponse>(endpointApi.todos).subscribe({
      next: (response : TodosResponse) => {
        this.todosList.set(response.todos);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'Something went wrong');
        this.loading.set(false);
      },
    });
  }
}
