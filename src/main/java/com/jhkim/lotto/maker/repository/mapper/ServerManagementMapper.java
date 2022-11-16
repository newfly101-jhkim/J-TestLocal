package com.jhkim.lotto.maker.repository.mapper;

import com.jhkim.lotto.maker.model.BaseUser;

public interface ServerManagementMapper {
    BaseUser selectUser(String id);
}
