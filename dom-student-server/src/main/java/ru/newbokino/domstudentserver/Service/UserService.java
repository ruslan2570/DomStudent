package ru.newbokino.domstudentserver.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ru.newbokino.domstudentserver.Entity.User;
import ru.newbokino.domstudentserver.Repo.UserRepo;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;
    public ResponseEntity authorize(String login, String password, int vkid){
        if(login == null || password == null ){

            return authorize(vkid);
        }

        User user = userRepo.findByLoginAndPassword(login, password);

        if(user == null)
            return new ResponseEntity(null, HttpStatus.FORBIDDEN);

        user.setVkid(vkid);
        userRepo.save(user);

        return authorize(vkid);
    }

    public ResponseEntity authorize(int vkid){

        User user = userRepo.findByVkid(vkid);

        if(user == null)
            return new ResponseEntity(null, HttpStatus.FORBIDDEN);

        return new ResponseEntity(null, HttpStatus.OK);

    }

    public ResponseEntity getUser(int vkid){
        User user = userRepo.findByVkid(vkid);

        if(user == null)
            return new ResponseEntity(null, HttpStatus.BAD_REQUEST);

        return new ResponseEntity(user, HttpStatus.OK);
    }

    public ResponseEntity permit(int vkid){
        User user = userRepo.findByVkid(vkid);
        user.setVkid(0);
        userRepo.save(user);

        return new ResponseEntity(null, HttpStatus.OK);
    }

}
