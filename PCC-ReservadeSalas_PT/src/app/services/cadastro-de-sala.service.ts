import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../shared/room.model';
import { AppConfig } from '../shared/config';

@Injectable({
  providedIn: 'root'
})

export class CadastroDeSalaService {

  constructor(private http: HttpClient) { }

  getAllRooms() {
    return this.http.get<Room[]>(AppConfig.apiUrl + '/salas');
  }

  addRoom(room: Room) {
    return this.http.post(AppConfig.apiUrl + '/salas', room);
  }

  deleteRoom(id: number) {
    return this.http.post(AppConfig.apiUrl + `/salas/delete/${id}`, null);
  }
}
