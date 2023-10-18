import { Component } from '@angular/core';
import { ReservaDeSalaService } from 'src/app/services/reserva-de-sala.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Schedule } from 'src/app/shared/schedule.model';

@Component({
  selector: 'app-lista-de-reservas',
  templateUrl: './lista-de-reservas.component.html',
  styleUrls: ['./lista-de-reservas.component.css']
})
export class ListaDeReservasComponent {
  schedules = this.reservaService.getAllSchedules();

  constructor(private reservaService: ReservaDeSalaService,
    private router: Router,
    private route: ActivatedRoute){}

  onCreateSchedule(){
    this.router.navigate(['/cadastro-de-reservas'], { relativeTo: this.route });
  }
  
  onDeleteSchedule(schedule: Schedule) {
    this.reservaService.deleteSchedule(schedule.id).subscribe(() => {
      this.refreshPage();
    });
  }

  refreshPage() {
    this.schedules = this.reservaService.getAllSchedules();
  }  
}
