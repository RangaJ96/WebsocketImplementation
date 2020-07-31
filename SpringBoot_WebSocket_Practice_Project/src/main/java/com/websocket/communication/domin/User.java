package com.websocket.communication.domin;

public class User {

    private String name;

    public User() {
        super();
    }

    public User(String username) {
        this.name = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
