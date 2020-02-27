import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('roles')
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 25, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
    status: string;

    @Column({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @Column({ type: 'timestamp', name: 'update_at' })
    updateAt: Date;

    // lógica many to many
    @ManyToMany(type => User, user => user.roles)
    @JoinColumn()
    users: User[];

}