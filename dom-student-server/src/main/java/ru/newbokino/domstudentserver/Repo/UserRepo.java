package ru.newbokino.domstudentserver.Repo;
import org.springframework.data.jpa.repository.Query;
import ru.newbokino.domstudentserver.Entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepo extends CrudRepository<User, Long> {

    public User findByLoginAndPassword(String login, String password);

    public User findByVkid(int vkid);

    public void deleteUserByVkid(int vkid);

}
