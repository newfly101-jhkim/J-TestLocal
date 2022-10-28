package io.aetherit.project.base.repository.mapper;

import io.aetherit.project.base.model.LottoData;

public interface LottoMapper {
    LottoData selectId(String id);

    int insertLotto(LottoData lotto);
}
