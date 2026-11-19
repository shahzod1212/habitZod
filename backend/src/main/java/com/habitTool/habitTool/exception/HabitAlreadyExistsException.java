package com.habitTool.habitTool.exception;

public class HabitAlreadyExistsException extends RuntimeException{
    public HabitAlreadyExistsException(String message){
        super(message);
    }
}
