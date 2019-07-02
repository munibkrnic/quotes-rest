import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {Comment} from './Comment';


@Entity("quote")
export class Quote{  // Quote je klasa a quote iznad je entitet

    @PrimaryGeneratedColumn({
        name: 'id'
    })
    id: number;

    
    @Column({
        name: 'quote_by',
        nullable: false, // notnull, indenticno je
        length: 100
    })
    quoteBy: string;
    
   
    @Column({
        name: 'quote_text',
        nullable: false, // notnull, indenticno je
        length: 1000
    })
    quoteText: string;

    
    @Column({
        name: 'quote_date',
        nullable: false
    })
    quoteDate: Date;

    @Column({
        name: 'image_path'
    })
    imagePath: string; // dodali smo jos jednu kolonu tipa string, entitet je gotov

    @OneToMany(type => Comment, comment => comment.quote)
    comments: Comment[];
}