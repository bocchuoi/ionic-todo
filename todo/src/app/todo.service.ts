// Phuong Hoang - 101306676
// Truong Thi Bui - 101300750
// Robert Kaczur - 10101489
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  aDayInMilisec = 1000 * 60 * 60 * 24

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

  // stolen from stackoverflow
  shorten(str:string, maxLen:number, separator = ' ') {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen)) + "...";
  }

  async getAllTasks() {
    let tasks: any[] = []
    let today = Date.now()
    let keys = await this.storage.keys()

    for (var key of keys) {
      if (key == "cats") {
        continue
      }
      const val = await this.storage.get(key);
      val.id = key

      // adding calculated attributes to task object
      const daysUntilDue = ((new Date(val.dueDate)).getTime() - today)
      const daysUntilDueFormatted = this.dhm(daysUntilDue)
      // round to 2 decimal place
      val.daysUntilDue = Math.round(daysUntilDue * 100) / (this.aDayInMilisec*100)
      val.daysUntilDueFormatted = daysUntilDueFormatted
      val.shortenedDetail = this.shorten(val.detail, 100)

      if (tasks[val.category]) {
        tasks[val.category].push(val)
      }
      else {
        tasks[val.category] = [val]
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

  async addCat(cats:string[]) {
    await this.storage.set('cats', cats)
  }

  // used in add task page
  async getCats() {
    return await this.storage.get('cats')
  }
}
