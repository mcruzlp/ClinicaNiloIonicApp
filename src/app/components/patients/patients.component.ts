import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Patient } from 'src/app/model/patient';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {

  patient: Patient = { nombre: '', tlfn: null, email: '' };

  constructor(
    private router: Router,
    private patientsService: PatientsService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  addPatient() {
    this.router.navigateByUrl('/patients');
  }

  editPatient(nombre: string) {
    this.router.navigateByUrl(
      `/patients${nombre != undefined ? '/' + nombre : ''}`
    );
  }

  deletePatient(nombre: string) {
    this.patientsService.deletePatient(nombre);
  }

  async presentAlertConfirm(p: Patient) {
    console.log('alerta');
    const alert = await this.alertController.create({
      header: 'Borrar paciente',
      message: `¿Estás seguro de que quieres borrar a <strong>${p.nombre}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.deletePatient(p.nombre);
          },
        },
      ],
    });
    await alert.present();
  }
}
