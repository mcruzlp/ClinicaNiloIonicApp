import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment';
import { AppointmentsService } from 'src/app/services/appointments.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit {
  appointment: Appointment = { id: null, date: null, hour: '', patient: '' };

  constructor(
    private appointmentsService: AppointmentsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id != null) {
      this.appointmentsService.getAppointment(+id).subscribe(data => this.appointment = data);
    }
  }

  saveAppointment() {
    this.appointmentsService.saveAppointment(this.appointment);
    this.router.navigateByUrl('/');
  }

  deleteAppointment(id: number) {
    this.appointmentsService.deleteAppointment(id);
  }
}
