package com.jhkim.lotto.maker.service;

import com.jhkim.lotto.maker.model.LottoData;
import com.jhkim.lotto.maker.model.LottoRandom;
import com.jhkim.lotto.maker.model.LottoUserData;
import com.jhkim.lotto.maker.repository.LottoRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LottoService {
    private static final Logger logger = LoggerFactory.getLogger(LottoService.class);

    private LottoRepository repository;

    @Autowired
    public LottoService(LottoRepository repository) {
        this.repository = repository;
    }

    public LottoData getLotto(String id) {return repository.selectId(id); }

    public LottoData createNewLotto(LottoData lotto) {
        lotto.setCreatedDatetime(LocalDateTime.now());
        logger.debug("[Service]lotto Data={}",lotto);
        repository.insertLotto(lotto);

        return lotto;
    }
    public List<LottoData> getLottoList() {
        return repository.selectLottoList();
    }

    public LottoRandom createNewRandomLotto(LottoRandom lottoRandom) {
        lottoRandom.setCreatedDatetime(LocalDateTime.now());
        lottoRandom.setExpCount(lottoRandom.getExpCount()+1);
        logger.debug("[LottoService] Random Lotto Data ={}",lottoRandom);
        repository.insertLottoRandom(lottoRandom);

        return lottoRandom;
    }

    public List<LottoRandom> getUserRandomLotto(String expDrawId, String userId) {
        List<LottoRandom> lottoRandom = repository.selectLottoRandomList(expDrawId, userId);
        logger.debug("[LottoService] Random Lotto Data ={}",lottoRandom);

        return lottoRandom;

    }

    public List<LottoUserData> getTestRandomLotto(String expDrawId, String userId) {
        List<LottoUserData> lottoRandom = repository.selectTestList(expDrawId, userId);

        logger.debug("[LottoService] Random Lotto Data ={}",lottoRandom);

        return lottoRandom;

    }

}
