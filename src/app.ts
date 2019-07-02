import express from 'express';
import * as config from './common/AppConfig';

//importujemo bodyParser
import bodyParser from 'body-parser';

// ovo je poziv za kreiranje konekcije
import { createConnection, Connection } from 'typeorm';

// importujemo express-jwt modul
import expressjwt from 'express-jwt';

// import za multer i path modul, ovo je za upload fajl;
import multer from 'multer';
import path from 'path';

import { Request, Response } from 'express';
import { QupteController } from './contorllers/QuoteController';  // ovdje treba dodati ./   kod controllers/
import { CommentController } from './contorllers/CommentController';
import { UserController } from './contorllers/UserController';

class App{
    app: express.Application;
    quoteController: QupteController = new QupteController();
    commentController: CommentController = new CommentController();
    userController: UserController  = new UserController();

    storage = multer.diskStorage({   // destinacija - gdje cemo da dodamo fajl i kako da formiramo ime
        destination: (req, file , callback) => {
            callback(null, path.join(__dirname, 'public/uploads'))
        },
        filename: (req, file, callback)=> {  // ovaj dio nam je za formiranje imena i za svaki fajl pridruzi trenutni datum i dodaj ime fajla
            callback(null, Date.now()+ '-' + file.originalname)
        }
    }); // omogucili smo preko multera da na nasem serveru cuva fajlove

    multer = multer({storage: this.storage});


    constructor(){
        this.app = express();
        this.config();
        this.routing();
        this.connectToDb();
    }

    private config(){

        this.app.use(bodyParser.json());
        this.app.use(express.static(path.join(__dirname,'public')));

        this.app.use((req: Request, res: Response, next) => {
            // ovdje pravimo filtriranje rikvestova

            res.header('Access-Control-Allow-Origin','http://localhost:4200');
            res.header('Access-Control-Allow-Headers','Origin, Content-Type, X-Requested-With, Authorization');
            res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');

            next();
            
            })

    }

    private routing(){
        const router = express.Router();

        let auth = expressjwt({
            secret: 'SECRET',  // ovo treba da se poklopi sa onim sto je u usercontroller.ts
            userProperty: 'body.userData' // 
        })

        router.get('/quote', auth, this.quoteController.getAllQuotes); // ovdje proslijedjuje u funkcijji QuoteControllers 
        router.get('/quote/:id', this.quoteController.getQuoteById);  // quote/:id kupi sve id, npr id 1 zatom id 1 itd...
        router.post('/quote',this.quoteController.createQuote);
        router.put('/quote', this.quoteController.updateQuote);
        router.delete('/quote/:id', this.quoteController.deleteQuote);


        router.get('/comment',this.commentController.getAllComments);
        router.get('/comment/:id', this.commentController.getCommentById);  // quote/:id kupi sve id, npr id 1 zatom id 1 itd...
        router.post('/comment',this.commentController.createComment);
        router.put('/comment', this.commentController.updateComment);
        router.delete('/comment/:id', this.commentController.deleteComment);

        router.post('/upload',
                this.multer.single('img'),
                (req: Request, res: Response)=>{
                    if (!req.file){
                        res.send({
                            status: -1,
                            msg: 'No file uploaded!'
                        })
                    }
                    else {
                        res.send({
                            status: 0, // 0 znaci da je sve ok, dobro je sve
                            msg: 'File uploaded',
                            filename: req.file.filename
                        })
                    }
                })

        router.post('/register', this.userController.register);
        router.post('/login', this.userController.login);
        

        this.app.use(router);
    }

    private connectToDb(){
        createConnection(config.dbConfig).then(connection => {  // createconetction vraca promise, ovo omogucavamo da se nakacimo na bazu
            console.log('Conected to DB');
            
        }).catch(err => {
            console.log("ERROR");
        
        })

    }

}

export default new App().app;