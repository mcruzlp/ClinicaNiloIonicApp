import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Appointment } from 'src/app/model/appointment';
import { AppointmentsService } from 'src/app/services/appointments.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  appointment: Appointment = { id: null, date: '', hour: '', patient: '' };

  constructor(
    private appointmentsService: AppointmentsService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  addAppointment() {
    this.router.navigateByUrl('/appointments');
  }

  editAppointment(id: number) {
    this.router.navigateByUrl(
      `/appointments${id != undefined ? '/' + id : ''}`
    );
  }

  deleteAppointment(id: number) {
    this.appointmentsService.deleteAppointment(id);
  }

  async presentAlertConfirm(a: Appointment) {
    console.log('alerta');
    const alert = await this.alertController.create({
      header: 'Borrar cita',
      message: `¿Estás seguro de que quieres borrar la cita de <strong>${a.patient}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.deleteAppointment(a.id);
          },
        },
      ],
    });
    await alert.present();
  }
}
