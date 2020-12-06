package com.homemonitor.homemonitor.model;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "vals")
public class Values {

    private Long valueId;
    private int sensorId;
    private Float value;
    private Timestamp ts;

    public Values(Long valueId, int sensorId, Float value, Timestamp ts) {
        this.valueId = valueId;
        this.sensorId = sensorId;
        this.value = value;
        this.ts = ts;
    }

    public Values(){}

    @Id
    @Column(name = "value_id")
    public Long getValueId() {
        return valueId;
    }
    public void setValueId(Long value_id) {
        this.valueId = value_id;
    }

    @Column(name = "sensor_id")
    public int getSensorId() {
        return sensorId;
    }
    public void setSensorId(int sensor_id) {
        this.sensorId = sensor_id;
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
}
