import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users_details')
export class UserDetails extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    name: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    lastname: string;

    @Column({ type: 'varchar', default: 'ACTIVE', length: 8, nullable: true })
    status: string;

    @Column({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date;

    @Column({ type: 'timestamp', name: 'update_at', nullable: true })
    updateAt: Date;

}