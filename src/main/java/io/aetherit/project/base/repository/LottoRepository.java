package io.aetherit.project.base.repository;


import io.aetherit.project.base.model.BaseUser;
import io.aetherit.project.base.repository.mapper.LottoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class LottoRepository {
    private LottoMapper mapper;

    @Autowired
    public LottoRepository(LottoMapper mapper) {this.mapper = mapper;}

//    public BaseUser selectUser(String id) { return mapper.selectUser(id);}

}
