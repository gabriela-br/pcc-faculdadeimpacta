import { Room } from './room.model';

export class Schedule {

    constructor(public id: number,
         public sala: Room, public nomePessoa: string, public telefonePessoa: string, public dataInicio: Date, public dataFim: Date) {
    }
}
