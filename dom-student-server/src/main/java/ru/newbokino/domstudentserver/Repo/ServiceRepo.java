package ru.newbokino.domstudentserver.Repo;

import org.springframework.data.repository.CrudRepository;
import ru.newbokino.domstudentserver.Entity.Service;
import ru.newbokino.domstudentserver.Entity.User;

import java.util.List;

public interface ServiceRepo extends CrudRepository<Service, Long> {

    public List<Service> findAllByUserList(User user);

    public List<Service> findAll();
}
