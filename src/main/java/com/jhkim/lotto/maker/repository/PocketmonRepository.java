package com.jhkim.lotto.maker.repository;

import com.jhkim.lotto.maker.model.PocketmonDogam;
import com.jhkim.lotto.maker.repository.mapper.LottoMapper;
import com.jhkim.lotto.maker.repository.mapper.PocketmonMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PocketmonRepository {
    private PocketmonMapper mapper;

    @Autowired
    public PocketmonRepository(PocketmonMapper mapper) {this.mapper = mapper;}

    public PocketmonDogam selectName(String name) {return mapper.selectName(name);}

    public List<PocketmonDogam> selectList() {return mapper.selectList();}
}
