package io.aetherit.project.base.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LottoUserData {
    private LottoRandom lotto;
    private List<LottoDataList> data;

}
