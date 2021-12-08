import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { TodayComponent } from '../components/today/today.component';
import { AppointmentsComponent } from '../components/appointments/appointments.component';
import { PatientsComponent } from '../components/patients/patients.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    HomePage,
    TodayComponent,
    AppointmentsComponent,
    PatientsComponent,
  ],
})
export class HomePageModule {}
