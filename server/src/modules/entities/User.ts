import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Note } from './Note'

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
    id: number

  @Column({type: 'text'})
    name: string

  @Column({type: 'text', select: false})
    password: string

  @OneToMany(() => Note, note => note.user)
    notes: Note[]
}
