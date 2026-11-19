package com.habitTool.habitTool.listener;

import com.habitTool.habitTool.event.AchievementCheckEvent;
import com.habitTool.habitTool.service.Impl.AchievementService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AchievementListener {

    private final AchievementService achievementService;

    @EventListener
    public void onAchievementCheck(AchievementCheckEvent event){
        achievementService.check(event.userId());
    }
}
