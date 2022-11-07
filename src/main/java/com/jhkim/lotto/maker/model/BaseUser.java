package com.jhkim.lotto.maker.model;

import com.jhkim.lotto.maker.model.support.BaseUserType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BaseUser {
    private String id;
    private String password;
    private String name;
    private BaseUserType type;
    private boolean isEnabled;
    private LocalDateTime createdDatetime;
    private LocalDateTime updatedDatetime;
}
