package ru.newbokino.domstudentserver.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ru.newbokino.domstudentserver.Entity.User;
import ru.newbokino.domstudentserver.Repo.ServiceRepo;
import ru.newbokino.domstudentserver.Repo.UserRepo;

import java.util.List;

@Service
public class ServiceService {
    @Autowired
    UserRepo userRepo;

    @Autowired
    ServiceRepo serviceRepo;

    public ResponseEntity deleteService(int vkid, long serviceId){
        User user = userRepo.findByVkid(vkid);

        ru.newbokino.domstudentserver.Entity.Service service =
                serviceRepo.findById(serviceId).get();

        user.delService(service);

        userRepo.save(user);

        return new ResponseEntity(null, HttpStatus.OK);
    }

    public ResponseEntity addService(int vkid, long serviceId){
        User user = userRepo.findByVkid(vkid);

        ru.newbokino.domstudentserver.Entity.Service service =
                serviceRepo.findById(serviceId).get();

        user.addService(service);

        userRepo.save(user);

        return new ResponseEntity(null, HttpStatus.OK);
    }

    public ResponseEntity getUsersServices(int vkid){
        User user = userRepo.findByVkid(vkid);
        List<ru.newbokino.domstudentserver.Entity.Service> services = serviceRepo.findAllByUserList(user);
        return new ResponseEntity(services, HttpStatus.OK);
    }

    public ResponseEntity getServices(){
        List<ru.newbokino.domstudentserver.Entity.Service> services = serviceRepo.findAll();
        return new ResponseEntity(services, HttpStatus.OK);
    }
}
