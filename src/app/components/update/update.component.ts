import {Component, OnInit} from '@angular/core';
import {Todo} from "../../model/todo";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpService} from "../../services/http.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  todoToBeUpdated: Todo;
  updatedForm: FormGroup;
  show: boolean = false;

  constructor(private httpService: HttpService, private fb: FormBuilder, private rout: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.rout.snapshot.paramMap.get('id');
    // @ts-ignore
    this.httpService.getById(+id).subscribe(todo => this.todoToBeUpdated = todo.data);

    this.updatedForm = this.fb.group({
      task: [''],
      description: [''],
      date: [''],
      done: [''],
    });
  }

  handelSubmitUpdate() {
    this.httpService.update(this.todoToBeUpdated.todoId, this.updatedForm.value).subscribe();
  }

  update() {
    this.updatedForm.setValue({
      task: this.todoToBeUpdated.task,
      description: this.todoToBeUpdated.description,
      date: this.todoToBeUpdated.date,
      done: this.todoToBeUpdated.done
    });
    this.show = !this.show;
  }

}
