import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Patient } from '../model/patient';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  patients: Patient[] = [];

  constructor() {
    this.getPatientsFromStorage().then((data) => (this.patients = data));
  }

  public getPatients(): Observable<Patient[]> {
    return of(this.patients);
  }

  public getPatient(nombre: string): Observable<Patient> {
    const patient = this.patients.filter((p) => p.nombre === nombre)[0];
    const newPatient = Object.assign({}, patient);
    return of(newPatient);
  }

  async savePatient(p: Patient): Promise<boolean> {
    if (p.nombre == undefined) {
      // paciente nuevo
      this.patients.push(p);
    } else {
      // edición de una cita existente
      this.deletePatient(p.nombre);
      this.patients.push(p);
    }

    await this.savePatientsIntoStorage();

    return true;
  }

  async deletePatient(nombre: string): Promise<boolean> {
    this.patients = this.patients.filter((p) => p.nombre != nombre);
    return await this.savePatientsIntoStorage();
  }

  async getPatientsFromStorage(): Promise<Patient[]> {
    const ret = await Storage.get({ key: 'patients' });
    return JSON.parse(ret.value) ? JSON.parse(ret.value) : [];
  }

  async savePatientsIntoStorage(): Promise<boolean> {
    await Storage.set({
      key: 'patients',
      value: JSON.stringify(this.patients),
    });

    return true;
  }
}
