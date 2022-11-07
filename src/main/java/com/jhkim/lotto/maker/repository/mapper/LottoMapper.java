package com.jhkim.lotto.maker.repository.mapper;

import com.jhkim.lotto.maker.model.LottoData;
import com.jhkim.lotto.maker.model.LottoDataList;
import com.jhkim.lotto.maker.model.LottoRandom;
import com.jhkim.lotto.maker.model.LottoUserData;

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
