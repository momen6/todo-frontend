import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css']
})
export class ShowAllComponent implements OnInit {

  listOfTodos: any[] = [];
  todoForm: FormGroup;
  show = false;

  constructor(private httpService: HttpService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.httpService.getAll()
      .subscribe((resultData: any) => {
        this.listOfTodos = resultData.data;
      });

    this.todoForm = this.fb.group({
      task: [''],
      description: [''],
      date: [''],
      done: [''],
    });
  }

  handleSubmit() {
    this.httpService.addTodo(this.todoForm.value).subscribe();
    this.ngOnInit();
  }

  showAddTodo() {
    this.show = !this.show;
  }

  delete(id:number){
    this.httpService.delete(id).subscribe();
    this.ngOnInit();
  }

}
