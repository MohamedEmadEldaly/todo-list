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
  todosListGrouped = signal<any>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  getTodosList(){
    this.http.get<TodosResponse>(endpointApi.todos).subscribe({
      next: (response : TodosResponse) => {
        this.todosList.set(response.todos);
        this.todosListGrouped.set(this.groupByComplete(response.todos));
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'Something went wrong');
        this.loading.set(false);
      },
    });
  }

  groupByComplete(list: Todo[]): Record<'true' | 'false', Todo[]> {
    return list.reduce(
      (groups, item : Todo) => {
        const key = item.completed ? 'true' : 'false';
        groups[key].push(item);
        return groups;
      },
      { true: [], false: [] } as Record<'true' | 'false', Todo[]>
    );
  }
}
