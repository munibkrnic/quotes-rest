import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity("user")
export class User {

    @PrimaryGeneratedColumn ({
        name: 'id'
    })
    id: number;

    @Column({
        name: 'username',
        unique: true,
        nullable: false// not null

    })
    username: string

    @Column({
        name: 'hashed_password',
        nullable: false
    })

    hashedPassword: string;

}