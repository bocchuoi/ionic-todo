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

    let taskss: any = []
    let cats:string[] = []

    let today = Date.now()

    let keys = await this.storage.keys()

    // getting unique categories
    // for (var key of keys) {
    //   const val = await this.storage.get(key);
    //   if (!cats.includes(val.category)) {
    //     cats.push(val.category)
    //   }
    // }

    // for (var cat of cats) {
    //   taskss[cat] = []
    // }


    for (var key of keys) {
      const val = await this.storage.get(key);
      val.id = key
      
      const daysUntilDue = ((new Date(val.dueDate)).getTime() - today) / (1000*60*60*24)
      // round to 2 decimal place
      val.daysUntilDue = Math.round(daysUntilDue * 100) / 100

      // taskss[val.category].push(val)
      tasks.push(val)
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
