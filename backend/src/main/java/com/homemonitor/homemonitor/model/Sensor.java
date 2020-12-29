package com.homemonitor.homemonitor.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sensors")

public class Sensor {

    private int id;
    private int userId;
    private String type;
    private String room;

    public Sensor(int id, int userId, String type, String room) {
        this.id = id;
        this.userId = userId;
        this.type = type;
        this.room = room;
    }

    public Sensor(){}

    @Id
    @Column(name = "id")
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    @Column(name = "userId")
    public int getUserId() {
        return userId;
    }
    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Column(name = "type", nullable = false)
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    @Column(name = "room", nullable = false)
    public String getRoom() {
        return room;
    }
    public void setRoom(String room) {
        this.room = room;
    }

    @Override
    public String toString() {
        return "Sensor{" +
                "id=" + id +
                ", userId=" + userId +
                ", type='" + type + '\'' +
                ", room='" + room + '\'' +
                '}';
    }
}
