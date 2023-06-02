package ru.newbokino.domstudentserver.Service;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.newbokino.domstudentserver.Repo.ServiceRepo;
import ru.newbokino.domstudentserver.Repo.UserRepo;
import ru.newbokino.domstudentserver.Entity.User;


import java.util.ArrayList;
import java.util.List;

@Service
public class InitialDataService implements InitializingBean {

    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String ddlAuto;

    @Autowired
    UserRepo userRepo;

    @Autowired
    ServiceRepo serviceRepo;

    private List<User> users;
    private List<ru.newbokino.domstudentserver.Entity.Service> services;

    @Override
    public void afterPropertiesSet(){
//        if(!checkUsers() && !checkServices()){
//            setUsers();
//            setServices();
//        }
        if(!ddlAuto.equals("Validate")){
            setUsers();
            setServices();
        }
    }

    public boolean checkUsers(){
        return userRepo.count() == 3;
    }

    public boolean checkServices(){
        return userRepo.count() == 5;
    }

    public void setUsers(){
        users = new ArrayList<>();

       users.add(new User(
               1,
               "Volyna",
               "42",
               "Рязань, ул. Островского, подвал 5",
               0));

        users.add(new User(
                2,
                "ruslan2570",
                "facealamer",
                "Рязанская область, Сараевский район, с. Новобокино, ул. Андреевка, д. 5",
                0));

        users.add(new User(
                3,
                "danyaKiller",
                "17",
                "Рязанская обл., Шиловский р-он, п. Ибредь",
                0));

        userRepo.saveAll(users);
    }

    public void setServices(){
        services = new ArrayList<>();

        ru.newbokino.domstudentserver.Entity.Service service1 = new ru.newbokino.domstudentserver.Entity.Service(1, "Тариф Флеш-Роял", 500);
        ru.newbokino.domstudentserver.Entity.Service service2 = new ru.newbokino.domstudentserver.Entity.Service(2, "Аренда роутера", 20);
        ru.newbokino.domstudentserver.Entity.Service service3 = new ru.newbokino.domstudentserver.Entity.Service(3, "Настойка на роутере", 1000);
        ru.newbokino.domstudentserver.Entity.Service service4 = new ru.newbokino.domstudentserver.Entity.Service(4, "Белый IP", 300);
        ru.newbokino.domstudentserver.Entity.Service service5 = new ru.newbokino.domstudentserver.Entity.Service(5, "Раздача торрентов", 150);

        services.add(service1);
        services.add(service2);
        services.add(service3);
        services.add(service4);
        services.add(service5);

        serviceRepo.saveAll(services);

        User volyna =userRepo.findByLoginAndPassword("Volyna", "42");

        volyna.addService(service1);
        volyna.addService(service2);
        volyna.addService(service3);

        User ruslan2570 = userRepo.findByLoginAndPassword("ruslan2570", "facealamer");

        ruslan2570.addService(service3);
        ruslan2570.addService(service4);
        ruslan2570.addService(service5);

        userRepo.save(volyna);
        userRepo.save(ruslan2570);

    }

}
