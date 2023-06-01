package ru.newbokino.domstudentserver.Controller;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.newbokino.domstudentserver.Service.ServiceService;

@RestController
@RequestMapping("/api/v1/service")
public class ServiceController {

    @Autowired
    ServiceService serviceService;

    @DeleteMapping("/{serviceId}")
    public ResponseEntity deleteService(@PathVariable(name = "serviceId") long id, @RequestParam(name = "vkid") int vkid){
        return serviceService.deleteService(vkid, id);
    }

    @PostMapping
    public ResponseEntity addService(@RequestParam(name = "serviceId") long id, @RequestParam(name = "vkid") int vkid){
        return serviceService.addService(vkid, id);
    }

    @GetMapping("/{vkid}")
    public ResponseEntity getUsersServices(@PathVariable(name = "vkid") int vkid){
        return serviceService.getUsersServices(vkid);
    }

    @GetMapping
    public ResponseEntity getServices(){
        return serviceService.getServices();
    }

}
