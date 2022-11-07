package io.aetherit.project.base.repository.mapper;

import io.aetherit.project.base.model.LottoData;
import io.aetherit.project.base.model.LottoDataList;
import io.aetherit.project.base.model.LottoRandom;
import io.aetherit.project.base.model.LottoUserData;

import java.util.List;

public interface LottoMapper {
    LottoData selectId(String id);

    int insertLotto(LottoData lotto);

    List<LottoData> selectLottoList();

    List<LottoRandom> selectLottoRandomList(String id, String userId);

    List<LottoUserData> selectTest(String id, String userId);

    int insertRandomLotto(LottoRandom lottoRandom);

    List<LottoDataList> selectLottoRandomDataList(String id, String userId);
}
