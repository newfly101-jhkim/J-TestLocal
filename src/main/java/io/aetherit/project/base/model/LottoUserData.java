package io.aetherit.project.base.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LottoUserData {
    private int id;
    private String userId;
    private int expDrawId;
    private int expCount;
    private LocalDateTime createdDatetime;

    private List<LottoDataList> data;

}
