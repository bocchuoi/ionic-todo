import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {subDays} from 'date-fns';
import { AddTaskPage } from '../add-task/add-task.page';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  x = (new Date()).valueOf() - (new Date("2023-03-22")).valueOf() / (1000*60*60*24)
  
  todoItems = [
  {
    name: 'Coding',
    dueDate: '2023-03-22',
    priority: 'high',
    category: 'work'
  },
  {
    name: 'Fishing',
    dueDate: '2023-03-22',
    priority: 'low',
    category: 'work'
  },
  {
    name: 'Gambling',
    dueDate: '2023-03-22',
    priority: 'mid',
    category: 'work'
  },
]

presentDay: number = Date.now()
  constructor(public modalCtrl:ModalController, public todoService:TodoService) {
    this.getAllTask()
  }

  async addNewTask() {
    const modal = await this.modalCtrl.create({
      component: AddTaskPage
    })

    modal.onDidDismiss().then(newTaskObject=>{
      this.todoItems.push(newTaskObject.data)
    })

    return await modal.present()
  }

  remove(index:number) {
    this.todoItems.splice(index,1)
  }

  getAllTask() {
    // this.todoItems = this.todoService.getAllTasks()
  }

}
