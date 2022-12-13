import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

@Entity('notes')
export class Note {

  @PrimaryGeneratedColumn()
    id: number

  @Column({ type: 'text' })
    title: string

  @Column({ type: 'text' })
    description: string

  @Column({ name: 'created_on', type: 'date' })
    createdOn: Date

  @ManyToOne(() => User, user => user.notes)
  @JoinColumn({ name: 'user_id' })
    user: User
}
