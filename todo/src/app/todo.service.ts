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

    let keys = await this.storage.keys()
    for (var key of keys) {
      const val = await this.storage.get(key);
      val.id = key
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
