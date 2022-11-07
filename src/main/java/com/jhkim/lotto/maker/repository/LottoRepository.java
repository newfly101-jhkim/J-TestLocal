package com.jhkim.lotto.maker.repository;

import com.jhkim.lotto.maker.model.LottoData;
import com.jhkim.lotto.maker.model.LottoRandom;
import com.jhkim.lotto.maker.model.LottoUserData;
import com.jhkim.lotto.maker.repository.mapper.LottoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LottoRepository {
    private LottoMapper mapper;

    @Autowired
    public LottoRepository(LottoMapper mapper) {this.mapper = mapper;}

    public LottoData selectId(String id) { return mapper.selectId(id); }

    public int insertLotto(LottoData lotto) { return mapper.insertLotto(lotto); }

    public List<LottoData> selectLottoList() {return mapper.selectLottoList();}

    public List<LottoRandom> selectLottoRandomList(String id, String userId) {return mapper.selectLottoRandomList(id,userId);}

    public List<LottoUserData> selectTestList(String id, String userId) {return mapper.selectTest(id,userId);}

    public int insertLottoRandom(LottoRandom lottoRandom) {return mapper.insertRandomLotto(lottoRandom);}

}
