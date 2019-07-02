import { Comment } from './../entities/Comment';
import { getManager } from 'typeorm';

export class CommentRepo{

    getAllComments(){
        return getManager().getRepository(Comment).find();  
    }
   
    
    getCommentById(id:number){
        return getManager().getRepository(Comment).findOne(id); 
    }


    createComment(comment:Comment){
        return getManager().getRepository(Comment).insert(comment); 
    }

    updateComment(comment:Comment){
        return getManager().getRepository(Comment).save(comment);  
    }
    
    deleteComment(id:Comment){
        return getManager().getRepository(Comment).delete(id);   
        }

  

}