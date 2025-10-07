import { Component, inject } from '@angular/core';
import { TodosService } from '../shared/services/todos-service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { Todo } from '../shared/models/todos.model';
import { Subject, takeUntil } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { AuthService } from '../shared/services/auth';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
@Component({
  selector: 'app-todos',
  imports: [CdkDropList, CdkDrag, CdkDropListGroup,MatProgressSpinnerModule,MatToolbarModule,MatIconModule,MatButtonModule],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
})
export class Todos {


  _unsubscribe = new Subject();
  todosService = inject(TodosService);
  authService = inject(AuthService)
  readonly dialog = inject(MatDialog);

  drop(event: CdkDragDrop<Todo[]>) {
    const item: Todo = event.container.data[event.currentIndex];
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      if (event.container.id === 'doneList') {
        item.completed = true;
      } else {
        item.completed = false;
      }

      this.todosService
        .updateTodo(item)
        .pipe(takeUntil(this._unsubscribe))
        .subscribe({
          error: (err) => {
            this.todosService.error.set(err.message || 'Something went wrong');
            this.todosService.loading.set(false);
          },
        });
    }
  }

  ngOnInit(): void {
    this.todosService.getTodosList();
  }
}
