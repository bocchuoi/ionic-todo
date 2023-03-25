import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {subDays} from 'date-fns';
import { AddTaskPage } from '../add-task/add-task.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  x = (new Date()).valueOf() - (new Date("2023-03-22")).valueOf() / (1000*60*60*24)
  
  todoItems = [
  {
    name: 'coding',
    dueDate: '2023-03-22',
    priority: 'high',
    category: 'work'
  },
  {
    name: 'xxxx',
    dueDate: '2023-03-22',
    priority: 'low',
    category: 'work'
  },
  {
    name: 'xxxx',
    dueDate: '2023-03-22',
    priority: 'mid',
    category: 'work'
  },
]

presentDay: number = Date.now()
  constructor(public modalCtrl:ModalController) {}

  async  addNewTask() {
    const modal = await this.modalCtrl.create({
      component: AddTaskPage
    })

    modal.onDidDismiss().then(newTaskObject=>{
      console.log(newTaskObject.data);
      this.todoItems.push(newTaskObject.data)
    })

    return await modal.present()
  }

  remove(index:number) {
    this.todoItems.splice(index,1)
  }

}
