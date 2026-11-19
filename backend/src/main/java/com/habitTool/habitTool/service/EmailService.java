package com.habitTool.habitTool.service;

import com.habitTool.habitTool.domain.Habit;

public interface EmailService {
    void sendEmailActivation(String to , String link);

    void sendEmailReminder(String to, Habit habit);
}
