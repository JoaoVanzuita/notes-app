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

  @Column({ name: 'updated_on', type: 'date' })
    updatedOn: Date

  @ManyToOne(() => User, user => user.notes, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
    user: User
}
