import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms'
import { ReservaDeSalaService } from 'src/app/services/reserva-de-sala.service';
import { CadastroDeSalaService } from '../../services/cadastro-de-sala.service';
import { Schedule } from 'src/app/shared/schedule.model';
import { Room } from 'src/app/shared/room.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cadastro-de-reservas',
  templateUrl: './cadastro-de-reservas.component.html',
  styleUrls: ['./cadastro-de-reservas.component.css']
})
export class CadastroDeReservasComponent  implements OnInit {
  schedule: FormGroup;
  rooms$: Observable<Room[]>;

  constructor(private reservaService: ReservaDeSalaService, private cadastroService: CadastroDeSalaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.InitForm();
  }

  onSubmit() {
    this.rooms$.subscribe((rooms : Room[]) => {
      
      let selectedRoom = rooms.find(r => r.id == this.schedule.get('selectedRoom').value);

      this.reservaService.addSchedule(
        this.GetScheduleFromForm(selectedRoom)
      ).subscribe( () => {
        this.router.navigate([''], { relativeTo: this.route });
      });
      
    });
    
  }

  onCancel() {
    this.router.navigate([''], { relativeTo: this.route });
  }

  private InitForm() {
    let id = null;
    let selectedRoom = null;
    let nomePessoa = '';
    let telefonePessoa = '';
    let dataInicio : Date;
    let dataFim : Date;

    this.schedule = new FormGroup({
      id: new FormControl(id),
      selectedRoom: new FormControl(selectedRoom),
      nomePessoa: new FormControl(nomePessoa),
      telefonePessoa: new FormControl(telefonePessoa),
      dataInicio: new FormControl(dataInicio),
      dataFim: new FormControl(dataFim)
    });

    this.rooms$ = this.cadastroService.getAllRooms();
  }

  GetScheduleFromForm(selectedRoom : Room) : Schedule {
    return {
      id: this.schedule.get('id').value,
      sala: selectedRoom,
      nomePessoa: this.schedule.get('nomePessoa').value,
      telefonePessoa: this.schedule.get('telefonePessoa').value,
      dataInicio: this.schedule.get('dataInicio').value,
      dataFim: this.schedule.get('dataFim').value,
    };
  }
}
