import { Lookup } from './lookup';
import { Column, ManyToOne, PrimaryGeneratedColumn, Table } from 'typeorm';

@Table()
export class LookupItem {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public quantity: number;

  @ManyToOne(type => Lookup, author => author.items,{
      cascadeAll : true
  })
  public Lookup: Lookup;  

  constructor(name: string, quantity: number) {
    this.name = name;
    this.quantity = quantity;
  }
}