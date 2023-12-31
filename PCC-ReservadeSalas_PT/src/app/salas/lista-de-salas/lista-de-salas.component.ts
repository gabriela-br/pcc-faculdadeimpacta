import { Component, OnInit } from '@angular/core';
import { CadastroDeSalaService } from '../../services/cadastro-de-sala.service';
import { Room } from '../../shared/room.model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-lista-de-salas',
  templateUrl: './lista-de-salas.component.html',
  styleUrls: ['./lista-de-salas.component.css']
})
export class ListaDeSalasComponent implements OnInit {
  user: User;
  rooms = this.cadastroService.getAllRooms();

  constructor(private cadastroService: CadastroDeSalaService,
    private router: Router,
    private route: ActivatedRoute) { 
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        this.user = JSON.parse(currentUser);
      }
    }

  ngOnInit() { }

  onCreateRoom() {
    if (this.userIsAdmin()) {
      this.router.navigate(['/cadastro-de-salas'], { relativeTo: this.route });
    }
  }

  onUpdateRoom(room: Room) {
    // Lógica para atualizar a sala
  }

  onDeleteRoom(room: Room) {
    if (this.userIsAdmin()) {
      this.cadastroService.deleteRoom(room.id).subscribe(() => {
        this.refreshPage();
      });
    }
  }

  refreshPage() {
    this.rooms = this.cadastroService.getAllRooms();
  }

  userIsAdmin(): boolean {
    return this.user && this.user.authorities.some((authority) => authority.authority === 'ROLE_ADMIN');
  }
}