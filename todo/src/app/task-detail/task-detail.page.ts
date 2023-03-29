import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage implements OnInit {
  @Input() task:any
  taskObj = {
    name:"",
    priority: "",
    category: "",
    detail: "",
    daysUntilDueFormatted: "",
    dueDate: 0,
  }

  constructor(public modalCtrl:ModalController) {
  }

  ngOnInit() {
    this.taskObj = this.task
  }

  async close() {
    await this.modalCtrl.dismiss()
  }

}
