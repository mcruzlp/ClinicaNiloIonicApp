import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/model/patient';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {
  patient: Patient = { nombre: '', tlfn: null, email: '' };

  constructor(
    private router: Router,
    private patientsService: PatientsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const nombre = this.activatedRoute.snapshot.paramMap.get('nombre');
    if (nombre != '') {
      this.patientsService
        .getPatient(nombre)
        .subscribe((data) => (this.patient = data));
    }
  }

  savePatient() {
    this.patientsService.savePatient(this.patient);
    this.router.navigateByUrl('/');
  }

  deletePatient(nombre: string) {
    this.patientsService.deletePatient(nombre);
  }
}
