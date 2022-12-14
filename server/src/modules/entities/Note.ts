import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { User } from './User'

@Entity('notes')
export class Note {

  @PrimaryColumn()
    id: string

  @Column({ type: 'text' })
    title: string

  @Column({ type: 'text' })
    description: string

  @Column({ name: 'updated_on', type: 'date' })
    updatedOn: Date

  @ManyToOne(() => User, user => user.notes, {
    onDelete: 'CASCADE',
    eager: true
  })
  @JoinColumn({ name: 'user_id' })
    user: User
}
