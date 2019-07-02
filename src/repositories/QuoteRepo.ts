import { Quote } from './../entities/Quote';
import { getManager } from 'typeorm';

export class QuoteRepo{

    getAllQuotes(){
        return getManager().getRepository(Quote).find({ relations: ['comments']});  // povezi se na bazy(getaManager), a getRepository i napravi menzdzera za qoute tabelu a find je komanda nad bazom, odnosno znaci vrati sve iz baze
        // ili ima znacenje select * from quote;   .find je direktni poziv na bazu podataka i dovuci mi sve quote objekte
        // ovdje smo dodali u find smo ukljucili i sledece relacije, tj. niz i stavili smo koje zelimo polje da popunimo

    }
   
    
    getQuoteById(id:number){
        return getManager().getRepository(Quote).findOne(id); // findOne nadji jednog, odnosno samo da nadje id kljuc 
    }


    createQuote(quote:Quote){
        return getManager().getRepository(Quote).insert(quote);  //
    }

    updateQuote(quote:Quote){
        return getManager().getRepository(Quote).save(quote);  //
    }
    
    deleteQuote(id:Quote){
        return getManager().getRepository(Quote).delete(id);   //
        }

  

}