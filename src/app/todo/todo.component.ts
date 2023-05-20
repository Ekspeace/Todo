import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from '../service/todo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
 

  todos: Array<any> = [];

  todoName!: string;

  dataStatus: string = 'Add'

  categoryId: any;

  todoId!: string;

  constructor(private todoService: TodoService, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get("id");
    this.todoService.loadTodos(this.categoryId).subscribe(val => {
      this.todos = val;
    })
  }

  onSubmit(f:NgForm){

    if(this.dataStatus == 'Add'){

      let todo = {
        todo: f.value.TodoText,
        isCompleted: false
      }
      this.todoService.saveTodo(this.categoryId, todo);
      f.resetForm();
    }
    else if(this.dataStatus == 'Edit'){
     this.todoService.updateTodo(this.categoryId,this.todoId, f.value.TodoText)
      f.resetForm();
      this.dataStatus = 'Add'
    }
  }

  onEdit(id: string, todo: string){
    this.todoName = todo;
    this.dataStatus = 'Edit';
    this.todoId = id;
  }

  onDelete(id: string, ){
    this.todoService.deleteTodo(this.categoryId,id);
  }

  onCompleted(todoId: string){
    this.todoService.markCompleted(this.categoryId, todoId);
  }

  onUnCompleted(todoId: string){
    this.todoService.markUnCompleted(this.categoryId, todoId);
  }
}
