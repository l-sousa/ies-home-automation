package com.homemonitor.homemonitor.model;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "vals")
public class Values {

    private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long valueId;
    private String userId;
    private int sensorId;
    private String room;
    private Float value;
    private Timestamp ts;

    public Values(String userId, String room, int sensorId, Float value, Timestamp ts) {
        this.userId=userId;
        this.room=room;
        this.sensorId = sensorId;
        this.value = value;
        this.ts = ts;
    }

    public Values(){}

    public Long getValueId() {
        return valueId;
    }
    public void setValueId(Long value_id) {
        this.valueId = value_id;
    }

    @Column(name = "userId")
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Column(name = "room")
    public String getRoom() {
        return room;
    }
    public void setRoom(String room) {
        this.room = room;
    }

    @Column(name = "sensorId")
    public int getSensorId() {
        return sensorId;
    }
    public void setSensorId(int sensorId) {
        this.sensorId = sensorId;
    }

    @Column(name = "value")
    public Float getValue() {
        return value;
    }
    public void setValue(Float value) {
        this.value = value;
    }

    @Column(name = "ts")
    public Timestamp getTs() {
        return ts;
    }
    public void setTs(Timestamp ts) {
        this.ts = ts;
    }

    @Override
    public String toString() {
        return "Values{" +
                "valueId=" + valueId +
                ", userId=" + userId +
                ", sensorId=" + sensorId +
                ", room='" + room + '\'' +
                ", value=" + value +
                ", ts=" + ts +
                '}';
    }
}
