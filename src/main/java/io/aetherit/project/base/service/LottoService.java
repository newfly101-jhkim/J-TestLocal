package io.aetherit.project.base.service;

import io.aetherit.project.base.model.LottoData;
import io.aetherit.project.base.model.LottoRandom;
import io.aetherit.project.base.repository.LottoRepository;
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
        logger.debug("[LottoService] Random Lotto Data ={}",lottoRandom);
        repository.insertLottoRandom(lottoRandom);

        return lottoRandom;
    }

    public List<LottoRandom> getUserRandomLotto(String expDrawId, String userId) {
        List<LottoRandom> lottoRandom = repository.selectLottoRandomList(expDrawId, userId);
        logger.debug("[LottoService] Random Lotto Data ={}",lottoRandom);

        return lottoRandom;

    }

}
