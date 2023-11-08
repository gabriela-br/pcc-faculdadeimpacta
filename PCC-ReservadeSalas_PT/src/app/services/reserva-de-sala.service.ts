import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Schedule } from '../shared/schedule.model';
import { AppConfig } from '../shared/config';

@Injectable({
  providedIn: 'root'
})
export class ReservaDeSalaService {

  constructor(private http: HttpClient) { }

  getAllSchedules(){
    return this.http.get<Schedule[]>(AppConfig.apiUrl + '/reservas')
  }

  getConcurrentSchedules(initDate: Date, endDate: Date){
    let url = AppConfig.apiUrl;
    url += '/reservas/concorrentes?dataInicio='
    url += initDate.toISOString();
    url += '&dataFim=';
    url += endDate.toISOString();
    return this.http.get<Schedule[]>(url);
  }

  addSchedule(schedule: Schedule) {
    return this.http.post(AppConfig.apiUrl + '/reservas', schedule);
  }

  deleteSchedule(id: number) {
    return this.http.post(AppConfig.apiUrl + `/reservas/delete/${id}`, null);
  }
}
