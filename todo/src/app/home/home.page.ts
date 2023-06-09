import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { subDays } from 'date-fns';
import { AddTaskPage } from '../add-task/add-task.page';
import { TodoService } from '../todo.service';
import { FormControl } from '@angular/forms'
import { TaskDetailPage } from '../task-detail/task-detail.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  searchField: FormControl
  todoItems: any
  presentDay: number = Date.now()
  cats: string[] = []

  constructor(public modalCtrl: ModalController, public todoService: TodoService) {
    // this.todoService.clearStorage()
    this.searchField = new FormControl("")
    this.getAllTask()
  }

  async ngOnInit() {
    const searchString = this.searchField.valueChanges.subscribe(txt => {
      if (txt == '') {
        this.getAllTask()
      }
      else {
        txt = txt.toLowerCase()
        // clone the cats
        const copyCats = Object.assign([], this.cats)
        for (var cat of copyCats) {
          this.todoItems[cat] = this.todoItems[cat].filter((item: any) => {
            // remember to add a return...
            return item.name.toLowerCase().includes(txt) || item.detail.toLowerCase().includes(txt)
          })
          // remove taskless cats
          if (this.todoItems[cat].length === 0) {
            this.cats.splice(this.cats.indexOf(cat), 1)
          }
        }
      }

    })
  }

  async addNewTask(selectedTask: any) {
    const modal = await this.modalCtrl.create({
      component: AddTaskPage,
      componentProps: { task: selectedTask }
    })

    modal.onDidDismiss().then(() => {
      this.getAllTask()
    })
    return await modal.present()
  }

  async taskDetail(selectedTask: any) {
    const modal = await this.modalCtrl.create({
      component: TaskDetailPage,
      componentProps: { task: selectedTask }
    })

    return await modal.present()
  }

  remove(id: string) {
    this.todoService.deleteTask(id)
    this.getAllTask()
  }

  async getAllTask() {
    await this.todoService.addCat(['Work', 'School', 'Social', 'Personal', 'Others'])
    this.todoItems = await this.todoService.getAllTasks()
    this.getOnDutyCats()
    console.log(this.todoItems)
    // Sort the todoItems array by due date
    for (const cat in this.todoItems) {
      this.todoItems[cat].sort((a: { dueDate: string | number | Date; }, b: { dueDate: string | number | Date; }) => {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return dateA - dateB;
      });
    }
  }

  // get only the cats that have tasks
  getOnDutyCats() {
    this.cats = []
    for (var cat in this.todoItems) {
      this.cats.push(cat)
    }
  }

}
