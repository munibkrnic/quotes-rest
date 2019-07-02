import {Request, Response} from 'express';
import { CommentRepo } from './../repositories/CommentRepo'; // './../
import { Comment } from './../entities/Comment';


export class CommentController{

    getAllComments(req: Request, res: Response){  // vrace kao rezultat niz objekata comment
        let commentRepo = new CommentRepo();

        commentRepo.getAllComments().then(data => {  // ova funkcija vraca promise, odnosno .find vraca propmis
            res.send(data);
        }).catch(err => {
            res.send(err);
        })
    }
    
    getCommentById(req: Request, res: Response){
        let commentRepo = new CommentRepo();
        commentRepo.getCommentById(req.params.id).then(data => {
            res.send(data);
        }).catch(err => {
            res.send(err);
        })
    }

   

    createComment = (req: Request, res: Response) => {
        //console.log(req.body);
        //res.send('Creating th comment');
        
        
        let comment = new Comment();
        comment.commentBy = req.body.commentBy;
        comment.commentText = req.body.commentText;
        comment.commentDate = new Date();

        let commentRepo = new CommentRepo();
        commentRepo.createComment(comment).then(data => {
            res.send(data);
        }).catch(err => {
            res.send(err);
        })
        
    }

    updateComment =  (req: Request, res: Response) => {
        let comment = new Comment();
        comment.id = req.body.id;
        comment.commentBy = req.body.commentBy;
        comment.commentText = req.body.commentText;
        comment.commentDate = new Date();

        let commentRepo = new CommentRepo();
        commentRepo.updateComment(comment).then(data => {
            res.send(data);
        }).catch(err => {
            res.send(err);
        })
    }
    deleteComment =(req: Request, res: Response) => {
        let commentRepo = new CommentRepo();

        commentRepo.deleteComment(req.params.id).then(data => {
            res.send(data);
        }).catch(err => {
            res.send(err);
        })
    }
}

