import { PermissionsEntity } from "src/permissions/entity/permissions.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('roles')
export class RolesEntity {
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

    // @Column("boolean")
    // enabled: boolean;

    @ManyToMany(type => PermissionsEntity, { cascade: true })
    @JoinTable()
    owns: PermissionsEntity[];

    @OneToMany(type => UserEntity, user => user.id)
    user: UserEntity[];
}
