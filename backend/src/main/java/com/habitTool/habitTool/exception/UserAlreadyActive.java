package com.habitTool.habitTool.exception;

public class UserAlreadyActive  extends RuntimeException{
    public UserAlreadyActive(String message){
        super(message);
    }
}
