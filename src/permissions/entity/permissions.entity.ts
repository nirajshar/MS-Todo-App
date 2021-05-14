
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('permissions')
export class PermissionsEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true
    })
    name: string;

    @CreateDateColumn() createdAt?: Date;
    @UpdateDateColumn() updatedAt?: Date;

   
}