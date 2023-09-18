import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CadastroDeSalaService } from '../services/cadastro-de-sala.service';
import { Room } from '../shared/room.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-lista-de-salas',
  templateUrl: './lista-de-salas.component.html',
  styleUrls: ['./lista-de-salas.component.css']
})
export class ListaDeSalasComponent implements OnInit {
  rooms = this.cadastroService.getAllRooms();

  constructor(private cadastroService: CadastroDeSalaService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit() { }

  onCreateRoom() {
    this.router.navigate(['/cadastro'], { relativeTo: this.route });
  }

  onUpdateRoom(room: Room) {
    // Lógica para atualizar a sala
  }

  onDeleteRoom(room: Room) {
    this.cadastroService.deleteRoom(room.id).subscribe(() => {
      this.refreshPage();
    });
  }

  refreshPage() {
    this.rooms = this.cadastroService.getAllRooms();
  }
}