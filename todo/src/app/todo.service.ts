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

  async deleteTask(id: string) {
    await this.storage.remove(id)
  }

  update() {

  }

  async getAllTasks() {
    let tasks: any = []
    let today = Date.now()
    let keys = await this.storage.keys()

    for (var key of keys) {
      const val = await this.storage.get(key);
      val.id = key
      const daysUntilDue = ((new Date(val.dueDate)).getTime() - today) / (1000*60*60*24)
      // round to 2 decimal place
      val.daysUntilDue = Math.round(daysUntilDue * 100) / 100

      let foundTheCat = false
      // {
      //   category: "",
      //   tasks: []
      // }
      //  add task to object of same cat
      for (var item of tasks) {
        if (item.category == val.category) {
          item.tasks.push(val)
          foundTheCat = true
        }
      }
      // if the cat doesn't exist create a new one
      if (!foundTheCat) {
        tasks.push({category: val.category, tasks: [val]})
      }

    }

    return tasks
  }

  async init() {
    await this.storage.create()
  }

  async getNumTask() {
    return await this.storage.length()
  }

  async clearStorage() {
    await this.storage.clear()
  }
}
