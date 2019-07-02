import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Quote } from "./Quote";

@Entity("comment")
export class Comment{

    @PrimaryGeneratedColumn({
        name: 'id'
    })
    id: number;


    @Column({
        name: 'comment_by',
        length:100
    })
    commentBy: string;

    @Column({
        name: 'comment_text',
        length:1000
    })
    commentText: string;


    @Column({
        name: 'comment_date'
        
    })
    commentDate: Date;

    @Column({
        name: 'quote_id'
        
    })
    quoteId: number;

    @ManyToOne(type => Quote, quote => quote.comments)
    @JoinColumn({ name: 'quote_id'})
    quote: Quote;



}