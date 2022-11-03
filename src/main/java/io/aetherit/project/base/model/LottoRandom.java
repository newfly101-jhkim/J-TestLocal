package io.aetherit.project.base.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LottoRandom {
    private int id;
    private String userId;
    private String expDrawId;
    private String expCount;
    private String expNo1;
    private String expNo2;
    private String expNo3;
    private String expNo4;
    private String expNo5;
    private String expNo6;
    private LocalDateTime createdDatetime;
}
