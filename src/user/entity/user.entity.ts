import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { RolesEntity } from "src/roles/entity/roles.entity";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true
    })
    username: string;

    @Column({
        type: 'varchar',
        nullable: false
    })
    password: string;

    @CreateDateColumn() createdAt?: Date;
    @CreateDateColumn() updatedAt?: Date;

    @ManyToOne(type => RolesEntity, role => role.id)
    @JoinColumn({ name: 'role_id' })
    role: RolesEntity;

    @BeforeInsert() async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }
}
