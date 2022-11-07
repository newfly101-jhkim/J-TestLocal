package com.jhkim.lotto.maker.repository.mapper;

import com.jhkim.lotto.maker.model.BaseUser;
import com.jhkim.lotto.maker.model.support.BaseUserType;

import java.util.List;


public interface UserMapper {
    BaseUser selectUser(String id);
    List<BaseUser> selectUsersWhereType(BaseUserType type);
    int insertUser(BaseUser account);
    int updateUser(BaseUser user);
}
