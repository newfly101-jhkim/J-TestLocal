package io.aetherit.project.base.repository;

import io.aetherit.project.base.model.LottoData;
import io.aetherit.project.base.repository.mapper.LottoMapper;
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

}
