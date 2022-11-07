package io.aetherit.project.base.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LottoDataList {
    private String expNo1;
    private String expNo2;
    private String expNo3;
    private String expNo4;
    private String expNo5;
    private String expNo6;
}
