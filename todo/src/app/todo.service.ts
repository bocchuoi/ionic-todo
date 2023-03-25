import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  
  constructor(private storage: Storage) {
    this.init()
  }
  addTask(key: string, val: any) {
    this.storage.set(key, val)
  }

  deleteTask() {

  }

  update() {

  }

  getAllTasks() {
    let tasks: any = []
    this.storage.forEach((val, key) => {
      val.key = key
      tasks.push(key)
    })
    console.log(tasks)
    console.log(tasks[0])
    return tasks
  }

  async init() {
    await this.storage.create()
  }

  async getNumTask() {
    return await this.storage.length()
  }
}
