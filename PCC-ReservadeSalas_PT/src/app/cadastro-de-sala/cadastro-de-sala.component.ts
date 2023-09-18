import { Component, OnInit } from '@angular/core';
import { CadastroDeSalaService } from '../services/cadastro-de-sala.service';
import { Room } from '../shared/room.model';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-de-sala',
  templateUrl: './cadastro-de-sala.component.html',
  styleUrls: ['./cadastro-de-sala.component.css']
})
export class CadastroDeSalaComponent implements OnInit {

  cadastro: FormGroup;

  constructor(private cadastroService: CadastroDeSalaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.InitForm();
  }

  onSubmit() {
    this.cadastroService.addRoom(
      this.mapFormGroupToModel()
    ).subscribe( () => {
      this.router.navigate([''], { relativeTo: this.route });
    });
  }

  onAddEquipment() {
    (<FormArray>this.cadastro.get('equipamentos')).push(
      new FormGroup({
        equipamento: new FormControl(null)
      }))
  }

  onDeleteEquipment(id: number) {
    (<FormArray>this.cadastro.get('equipamentos')).removeAt(id);
  }

  onCancel() {
    this.router.navigate([''], { relativeTo: this.route });
  }

  private InitForm() {
    let id = null;
    let nome = '';
    let equipamentos = new FormArray([]);
    let capacidade = '';
    let segunda = false;
    let terca = false;
    let quarta = false;
    let quinta = false;
    let sexta = false;

    this.cadastro = new FormGroup({
      id: new FormControl(id),
      nome: new FormControl(nome),
      equipamentos: equipamentos,
      capacidade: new FormControl(capacidade),
      segunda: new FormControl(segunda),
      terca: new FormControl(terca),
      quarta: new FormControl(quarta),
      quinta: new FormControl(quinta),
      sexta: new FormControl(sexta)
    })
  }

  mapFormGroupToModel(): Room {
    let dias: string[] = []

    if (this.cadastro.get('segunda').value) {
      dias.push('segunda');
    }

    if (this.cadastro.get('terca').value) {
      dias.push('terca');
    }

    if (this.cadastro.get('quarta').value) {
      dias.push('quarta');
    }

    if (this.cadastro.get('quinta').value) {
      dias.push('quinta');
    }

    if (this.cadastro.get('sexta').value) {
      dias.push('sexta');
    }

    let equip = Array.from<any, string>(this.cadastro.get('equipamentos').value, item => item.equipamento);

    return {
      id: this.cadastro.get('id').value,
      nome: this.cadastro.get('nome').value,
      equipamentos: equip,
      capacidade: this.cadastro.get('capacidade').value,
      diasFuncionamento: dias
    };
  }
}
