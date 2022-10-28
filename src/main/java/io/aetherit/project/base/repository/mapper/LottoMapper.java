package io.aetherit.project.base.repository.mapper;

//import io.aetherit.project.base.model.BaseUser;
//import io.aetherit.project.base.model.support.BaseUserType;
//
//import java.util.List;

import io.aetherit.project.base.model.LottoData;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LottoMapper {
    LottoData selectId(String id);

    int insertLotto(LottoData lotto);
}
