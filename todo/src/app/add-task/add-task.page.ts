import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

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

  constructor(public modalCtrl:ModalController) { }

  ngOnInit() {
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
    await this.modalCtrl.dismiss(this.taskObject)
  }
}
