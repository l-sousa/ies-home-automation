package com.homemonitor.homemonitor.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {

	private @Id @GeneratedValue(strategy=GenerationType.IDENTITY) Long userId;
    private String nome;
    private String password;
    private String token;

    public User(String nome,String password,String token) {
    	this.nome = nome;
    	this.password = password;
    	this.token = token;
    }

    public User(){}

    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long value_id) {
        this.userId = value_id;
    }
    
    @Id
    @Column(name = "nome")
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }

    @Column(name = "password")
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name = "token")
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + userId +
                ", nome=" + nome +
                ", password='" + password + '\'' +
                ", token='" + token + '\'' +
                '}';
    }
}

