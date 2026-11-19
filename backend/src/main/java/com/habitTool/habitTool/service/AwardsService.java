package com.habitTool.habitTool.service;

import com.habitTool.habitTool.dtos.AwardRequest;
import com.habitTool.habitTool.dtos.AwardsDto;

import java.util.List;

public interface AwardsService {
    AwardsDto create(AwardRequest awardRequest);

    List<AwardsDto> getAllAwards();

}
