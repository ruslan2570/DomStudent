package ru.newbokino.domstudentserver.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.newbokino.domstudentserver.Entity.User;
import ru.newbokino.domstudentserver.Service.UserService;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/auth")
    public ResponseEntity authorize(@RequestParam(name = "login", required = false) String login,
                                    @RequestParam(name = "password", required = false) String password,
                                    @RequestParam(name = "vkid") int vkid){
        return userService.authorize(login, password, vkid);
    }

    @GetMapping("/{vkid}")
    public ResponseEntity getUser(@PathVariable(name = "vkid") int vkid){
        return userService.getUser(vkid);
    }







}
