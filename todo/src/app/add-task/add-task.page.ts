import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {
  @Input() task:any;
  btnMsg = ''
  cats = ['Work', 'School', 'Social']
  taskName: any
  taskDate: any
  taskPriority: any
  taskCategory: any
  taskObject = {}
  msg: any

  constructor(public modalCtrl:ModalController, public todoService:TodoService) { }

  ngOnInit() {
    // object is not empty means user clicked update
    if (Object.keys(this.task).length !== 0) {
      this.btnMsg = 'Update'
      this.taskName = this.task.name
      this.taskDate = this.task.dueDate
      this.taskPriority = this.task.priority
      this.taskCategory = this.task.category
    }
    else {
      this.btnMsg = 'Add'

    }


  }

  async close() {
    await this.modalCtrl.dismiss()
  }

  selectedCat(index: number) {
    this.taskCategory = this.cats[index]
  }

  async addTask() {

    this.taskObject = {
      name: this.taskName,
      dueDate: this.taskDate,
      priority: this.taskPriority,
      category: this.taskCategory
    }





    // id is the number of all the todo items + 1




    // make sure all the fields are filled in
    if (this.taskName && this.taskDate && this.taskPriority && this.taskCategory) {
      let newItemId: number = 0
      // add if true
      if (Object.keys(this.task).length === 0) {
        newItemId = await this.todoService.getNumTask() + 1
      }
      else {
        newItemId = this.task.id
        this.task = {}
      }
      console.log(newItemId)
      await this.todoService.addTask(newItemId.toString(), this.taskObject)
      await this.modalCtrl.dismiss(this.taskObject)
    }
    else {
      console.log(this.taskDate)
      this.msg = "Make sure name, date, priorty and category are filled in!";
    }

  }
}
