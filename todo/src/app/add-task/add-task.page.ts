import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {
  cats = ['Work', 'School', 'Social']

  taskName: any
  taskDate: any
  taskPriority: any
  taskCategory: any
  taskObject = {}
  msg: any

  constructor(public modalCtrl:ModalController, public todoService:TodoService) { }

  ngOnInit() {
  }

  async close() {
    await this.modalCtrl.dismiss()
  }

  selectedCat(index: number) {
    this.taskCategory = this.cats[index]
  }

  async addTask() {


    // id is the number of all the todo items + 1
    let newItemId = await this.todoService.getNumTask() + 1

    this.taskObject = {
      name: this.taskName,
      dueDate: this.taskDate,
      priority: this.taskPriority,
      category: this.taskCategory
    }


    // check if name and date are empty
    if (this.taskName && this.taskDate) {
      await this.todoService.addTask(newItemId.toString(), this.taskObject)
      await this.modalCtrl.dismiss(this.taskObject)
    }
    else {
      this.msg = "taskName & taskDate can't be empty!";
      console.log("taskName & taskDate can't be empty!")
    }

  }
}
