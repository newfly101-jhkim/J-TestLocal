package com.jhkim.lotto.maker.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PocketmonDogam {
    private int id;
    private int dogamId;
    private String name;
    private Boolean dogamDefault;
    private Boolean dogamStar3;
    private Boolean dogamDiffColor;
    private Boolean dogamShadow;
    private Boolean dogamPurify;
    private Boolean dogamEvolution;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}
