package io.aetherit.project.base.repository.mapper;

import io.aetherit.project.base.model.LottoData;
import io.aetherit.project.base.model.LottoDataList;
import io.aetherit.project.base.model.LottoRandom;

import java.util.List;

public interface LottoMapper {
    LottoData selectId(String id);

    int insertLotto(LottoData lotto);

    List<LottoData> selectLottoList();

    List<LottoRandom> selectLottoRandomList();

    int insertRandomLotto(LottoRandom lottoRandom);
}
