package com.habitTool.habitTool.service.Impl;

import com.habitTool.habitTool.domain.Awards;
import com.habitTool.habitTool.dtos.AwardRequest;
import com.habitTool.habitTool.dtos.AwardsDto;
import com.habitTool.habitTool.mapper.AwardMapper;
import com.habitTool.habitTool.repository.AwardsRepository;
import com.habitTool.habitTool.service.AwardsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AwardsServiceImpl implements AwardsService {
    private final AwardsRepository awardsRepository;
    private final AwardMapper awardMapper;
    @Override
    public AwardsDto create(AwardRequest awardRequest) {
        Awards awards = awardMapper.toEntity(awardRequest);
        Awards saved = awardsRepository.save(awards);
        return awardMapper.toDto(saved);
    }

    @Override
    public List<AwardsDto> getAllAwards() {

        return awardsRepository.findAll()
                .stream()
                .map(awardMapper::toDto)
                .toList();
    }
}
