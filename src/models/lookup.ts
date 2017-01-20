import { LookupItem } from './';
import { Table, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Table()
export class Lookup {

  @PrimaryGeneratedColumn()
  public id: number;  

  @OneToMany(type => LookupItem, item => item.Lookup, {
      cascadeAll : true
  })
  public items: LookupItem[];

  constructor() {
      this.items = [];
  }
}