import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Appointment } from '../model/appointment';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  appointments: Appointment[] = [];
  appointmentsCounter: number = 0;

  constructor() {
    this.getAppointmentsFromStorage().then(
      (data) => (this.appointments = data)
    );

    this.getAppointmentsCounterFromStorage().then(
      (data) => (this.appointmentsCounter = data)
    );
  }

  public getLocalAppointments(): Appointment[] {
    return this.appointments;
  }

  public getAppointments(): Observable<Appointment[]> {
    return of(this.appointments);
  }

  public getAppointment(id: number): Observable<Appointment> {
    const appointment = this.appointments.filter((a) => a.id === id)[0];
    const newAppoint = Object.assign({}, appointment);
    return of(newAppoint);
  }

  async saveAppointment(a: Appointment): Promise<boolean> {
    if (a.id == undefined) {
      // cita nueva
      a.id = this.appointmentsCounter++;
      this.appointments.push(a);
    } else {
      // edición de una cita existente
      this.deleteAppointment(a.id);
      this.appointments.push(a);
    }

    await this.saveAppointmentsIntoStorage();
    await this.saveAppointmentsCounterIntoStorage();

    return true;
  }

  async deleteAppointment(id: number): Promise<boolean> {
    this.appointments = this.appointments.filter((a) => a.id != id);
    return await this.saveAppointmentsIntoStorage();
  }

  async getAppointmentsFromStorage(): Promise<Appointment[]> {
    const ret = await Storage.get({ key: 'appointments' });
    return JSON.parse(ret.value) ? JSON.parse(ret.value) : [];
  }

  async getAppointmentsCounterFromStorage(): Promise<number> {
    const ac = await Storage.get({ key: 'appointmentsCounter' });
    console.log('appointmentsCounter: ' + JSON.stringify(ac.value));
    return Number.isInteger(+ac.value) ? +ac.value : 0;
  }

  async saveAppointmentsIntoStorage(): Promise<boolean> {
    await Storage.set({
      key: 'appointments',
      value: JSON.stringify(this.appointments),
    });

    return true;
  }

  async saveAppointmentsCounterIntoStorage(): Promise<boolean> {
    await Storage.set({
      key: 'appointmentsCounter',
      value: '' + this.appointmentsCounter,
    });

    return true;
  }
}
