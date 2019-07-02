import { User } from './../entities/User';
import { getManager } from 'typeorm';

export class UserRepo{

    public getAllUsers(){
        return getManager().getRepository(User).find();
    }

    public getUserById(id: number){
        return getManager().getRepository(User).findOne(id);
    }

    public getUserByUsername(wantedUsername: string){
        return getManager().getRepository(User).findOne({
            where: { username: wantedUsername }
        });
    }

    public insertUser(user: User) {
        return getManager().getRepository(User).insert(user);
    }
}