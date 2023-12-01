import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ReservaDeSalaService } from 'src/app/services/reserva-de-sala.service';
import { CadastroDeSalaService } from '../../services/cadastro-de-sala.service';
import { Schedule } from 'src/app/shared/schedule.model';
import { Room } from 'src/app/shared/room.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-cadastro-de-reservas',
  templateUrl: './cadastro-de-reservas.component.html',
  styleUrls: ['./cadastro-de-reservas.component.css']
})
export class CadastroDeReservasComponent  implements OnInit {
  weekdays: string[] = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];

  schedule: FormGroup;
  allRooms$: Observable<Room[]>;
  availableRooms$: Observable<Room[]>;
  selectedRoom: Room;
  showListOfRooms: boolean = false;

  constructor(private reservaService: ReservaDeSalaService, private cadastroService: CadastroDeSalaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.InitForm();
  }

  onSubmit() {
    this.reservaService.addSchedule(
        this.GetScheduleFromForm()
      ).subscribe( () => {
        this.router.navigate(['/lista-de-reservas'], { relativeTo: this.route });
    });
  }

  onCancel() {
    this.router.navigate(['/lista-de-reservas'], { relativeTo: this.route });
  }

  onChange(){
    let isReady: boolean = true;

    isReady = isReady && this.schedule.get('dataInicio').value;
    isReady = isReady && this.schedule.get('dataFim').value;
    isReady = isReady && !this.schedule.get('dataInicio').hasError('timeRangeError');
    isReady = isReady && !this.schedule.get('dataFim').hasError('timeRangeError');

    if(isReady)
    {
      let initDate = new Date(this.schedule.get('dataInicio').value);
      let endDate = new Date(this.schedule.get('dataFim').value);

      let currentDate = new Date(initDate);
      const coveredWeekdays: string[] = [];
      while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
        coveredWeekdays.push(this.weekdays[dayOfWeek]);
        currentDate.setDate(currentDate.getDate() + 1); 
      }

      this.allRooms$.subscribe((rooms: Room[]) => {
        this.reservaService.getConcurrentSchedules(initDate, endDate).subscribe((schedules: Schedule[]) => {
          this.availableRooms$ = of(rooms.filter(r =>
            !schedules.some(s => s.sala.id === r.id) && coveredWeekdays.some(day => r.diasFuncionamento.includes(day))
          ));
        });
      });
    }

    this.showListOfRooms = isReady;
  }

  onRoomSelectionChange(event: any) {
    if(event.target.value && event.target.value > 0){
      this.availableRooms$.subscribe((rooms : Room[]) => {
        this.selectedRoom = rooms.find(r => r.id == event.target.value);
      });
    }
    else{
      this.selectedRoom = null;
    }
  }

  get isFormValid(): boolean {
    return this.schedule.valid && (this.schedule.touched || this.schedule.dirty);
  }

  private InitForm() {
    let id = null;
    let nomePessoa = '';
    let telefonePessoa = '';
    let dataInicio : Date;
    let dataFim : Date;

    this.schedule = new FormGroup({
      id: new FormControl(id),
      selectedRoom: new FormControl(this.selectedRoom, Validators.required),
      nomePessoa: new FormControl(nomePessoa, Validators.required),
      telefonePessoa: new FormControl(telefonePessoa, Validators.required),
      dataInicio: new FormControl(dataInicio, [Validators.required, this.futureDateValidator()]),
      dataFim: new FormControl(dataFim, [Validators.required, this.futureDateValidator(), this.dateAfterValidator()])
    });

    this.allRooms$ = this.cadastroService.getAllRooms();
  }

  private futureDateValidator() {
    return (control: FormControl) => {
      if(control.value) {
        const selectedDate = new Date(control.value);
        const currentDate = new Date();
        return selectedDate > currentDate ? null : { futureDate: true };
      }
      return null;
    };
  }
  
  private dateAfterValidator() {
    return (control: FormControl) => {
      if(!this.schedule)
        return null;
      
      let dtIni = this.schedule.get('dataInicio').value;
      if(dtIni && control.value) {
        const dataInicio = new Date(dtIni);
        const dataFim = new Date(control.value);
        return dataFim > dataInicio ? null : { dateAfter: true };
      }
      return null;
    };
  }

  GetScheduleFromForm() : Schedule {
    return {
      id: this.schedule.get('id').value,
      sala: this.selectedRoom,
      nomePessoa: this.schedule.get('nomePessoa').value,
      telefonePessoa: this.schedule.get('telefonePessoa').value,
      dataInicio: this.schedule.get('dataInicio').value,
      dataFim: this.schedule.get('dataFim').value,
    };
  }
}
