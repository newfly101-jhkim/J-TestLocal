package com.jhkim.lotto.maker.repository.mapper;

import com.jhkim.lotto.maker.model.PocketmonDogam;

import java.util.List;

public interface PocketmonMapper {
    PocketmonDogam selectName(String name);
    List<PocketmonDogam> selectList();
}
