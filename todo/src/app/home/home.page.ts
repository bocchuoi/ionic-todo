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
  cats:any

  constructor(public modalCtrl:ModalController, public todoService:TodoService) {
    // this.todoService.clearStorage()
    this.getAllTask()
  }

  async getCats() {
    this.cats = await this.todoService.getCats()
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
    await this.todoService.addCat(['Work', 'School', 'Social'])
    // initialize the cats before retrieving tasks
    this.getCats()
    this.todoItems = await this.todoService.getAllTasks()
    // filter out taskless cats
    var copyCats = Object.assign([], this.cats);
    for(var cat of copyCats) {
      // console.log(cat + " is " + (this.todoItems[cat].length === 0))
      if (this.todoItems[cat].length === 0) {
        this.cats.splice(this.cats.indexOf(cat), 1)
      }
    }
  }

}
