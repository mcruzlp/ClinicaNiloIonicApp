import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/model/appointment';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit {
  today: Date;
  appointmtsToday: Appointment[];
  appointments: Appointment[];

  constructor() {}

  ngOnInit() {
    this.today = new Date();
  }

  getAppointmentsForToday(today: Date) {
    this.appointmtsToday = this.appointments.filter(
      (appt) => appt.date == today
    );
  }
}


