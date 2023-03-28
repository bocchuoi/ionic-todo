import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  cats: string[] = []
  aDayInMilisec = 1000*60*60*24

  constructor(private storage: Storage) {
    this.init()
  }
  addTask(key: string, val: any) {
    this.storage.set(key, val)
  }

  async deleteTask(id: string) {
    await this.storage.remove(id)
  }

  // stolen from stackoverflow
  dhm (ms:number) {
    ms = ms < 0 ? ms * -1: ms 
    const days = Math.floor(ms / (24*60*60*1000));
    const daysms = ms % (24*60*60*1000);
    const hours = Math.floor(daysms / (60*60*1000));
    const hoursms = ms % (60*60*1000);
    const minutes = Math.floor(hoursms / (60*1000));
    const minutesms = ms % (60*1000);
    const sec = Math.floor(minutesms / 1000);
    return days + " day " + hours + " hour " + minutes + " minute";
  }

  async getAllTasks() {
    let tasks: any[] = []
    let today = Date.now()
    let keys = await this.storage.keys()

    // reset the cats
    this.cats = []
    
    for (var key of keys) {
      if (key == "cats") {
        continue
      }
      const val = await this.storage.get(key);
      val.id = key
      const daysUntilDue = ((new Date(val.dueDate)).getTime() - today)
      const daysUntilDueFormatted = this.dhm(daysUntilDue)
      // round to 2 decimal place
      val.daysUntilDue = Math.round(daysUntilDue * 100) / (this.aDayInMilisec*100)
      val.daysUntilDueFormatted = daysUntilDueFormatted

      if (tasks[val.category]) {
        tasks[val.category].push(val)
      }
      else {
        this.cats.push(val.category)
        tasks[val.category] = [val]
      }
    }
    console.log(tasks)
    return tasks
  }

  async init() {
    await this.storage.create()
  }

  getAvailableCats() {
    return this.cats
  }

  async getNumTask() {
    return await this.storage.length()
  }

  async clearStorage() {
    await this.storage.clear()
  }

  async addCat(cats:any) {
    await this.storage.set('cats', cats)
  }

  async getCats() {
    return await this.storage.get('cats')
  }
}
