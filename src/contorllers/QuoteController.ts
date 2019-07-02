import {Request, Response} from 'express';
import { QuoteRepo } from './../repositories/QuoteRepo'; // './../
import { Quote } from './../entities/Quote';


export class QupteController{

    getAllQuotes(req: Request, res: Response){  // vrace kao rezultat niz objekata quote
        let quoteRepo = new QuoteRepo();

        quoteRepo.getAllQuotes().then(data => {  // ova funkcija vraca promise, odnosno .find vraca propmis
            res.send(data);
        }).catch(err => {
            res.send(err);
        })
    }
    
    getQuoteById(req: Request, res: Response){
        let quoteRepo = new QuoteRepo();
        quoteRepo.getQuoteById(req.params.id).then(data => {
            res.send(data);
        }).catch(err => {
            res.send(err);
        })
    }

   

    createQuote = (req: Request, res: Response) => {
        //console.log(req.body);
        //res.send('Creating th quote');
        
        
        let quote = new Quote();
        quote.quoteBy = req.body.quoteBy;
        quote.quoteText = req.body.quoteText;
        quote.imagePath = req.body.imagePath;
        quote.quoteDate = new Date();

        let quoteRepo = new QuoteRepo();
        quoteRepo.createQuote(quote).then(data => {
            res.send(data);
        }).catch(err => {
            res.send(err);
        })
        
    }

    updateQuote =  (req: Request, res: Response) => {
        let quote = new Quote();
        quote.id = req.body.id;
        quote.quoteBy = req.body.quoteBy;
        quote.quoteText = req.body.quoteText;
        quote.imagePath = req.body.imagePath;
        quote.quoteDate = new Date();

        let quoteRepo = new QuoteRepo();
        quoteRepo.updateQuote(quote).then(data => {
            res.send(data);
        }).catch(err => {
            res.send(err);
        })
    }
    deleteQuote =(req: Request, res: Response) => {
        let quoteRepo = new QuoteRepo();

        quoteRepo.deleteQuote(req.params.id).then(data => {
            res.send(data);
        }).catch(err => {
            res.send(err);
        })
    }
}

