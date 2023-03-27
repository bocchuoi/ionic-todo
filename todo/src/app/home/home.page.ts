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

  todoItems:any
  presentDay: number = Date.now()

  constructor(public modalCtrl:ModalController, public todoService:TodoService) {
    // this.todoService.clearStorage()
    this.getAllTask()

  }

  async addNewTask(selectedTask:any) {
    const modal = await this.modalCtrl.create({
      component: AddTaskPage,
      componentProps: {task: selectedTask}

    })

    modal.onDidDismiss().then(()=>{
      this.getAllTask()
    })

    return await modal.present()
  }

  remove(id:string) {
    this.todoService.deleteTask(id)
    this.getAllTask()
  }

  async getAllTask() {
    // let x = await this.todoService.getAllTasks()
    this.todoItems = await this.todoService.getAllTasks()
  }


}
