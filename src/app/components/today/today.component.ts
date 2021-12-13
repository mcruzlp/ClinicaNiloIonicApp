import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Appointment } from 'src/app/model/appointment';
import { AppointmentsService } from 'src/app/services/appointments.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit {
  appointments: Appointment[] = [];
  today: Date;
  appointsToday: boolean;

  constructor(private appointmentsService: AppointmentsService) {
  }

  ngOnInit() {
    this.today = new Date();
  }

  public getAppointmentByDate(today: string): Observable<Appointment> {
    const appointment = this.appointments.filter((a) => a.date === today)[0];
    const newAppoint = Object.assign({}, appointment);
    return of(newAppoint);
  }
}


