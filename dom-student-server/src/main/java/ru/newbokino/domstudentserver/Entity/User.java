package ru.newbokino.domstudentserver.Entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users", indexes = {
        @Index(name = "idx_user_vkid_unq", columnList = "vkid", unique = false)})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String login;

    private String password;

    private String address;

    private int vkid;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_service",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    private List<Service> serviceList;

    public User() {
    }

    public User(long id, String login, String password, String address, int vkid) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.address = address;
        this.vkid = vkid;
    }

    public void addService(Service service){
        if(serviceList == null)
            serviceList = new ArrayList<Service>();
        serviceList.add(service);
    }

    public void delService(Service service){
        if(serviceList == null)
            return;
        serviceList.remove(service);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getVkid() {
        return vkid;
    }

    public void setVkid(int vkid) {
        this.vkid = vkid;
    }
}
