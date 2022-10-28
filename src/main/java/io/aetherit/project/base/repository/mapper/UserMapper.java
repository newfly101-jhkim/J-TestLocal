package io.aetherit.project.base.repository.mapper;

import io.aetherit.project.base.model.BaseUser;
import io.aetherit.project.base.model.support.BaseUserType;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


public interface UserMapper {
    BaseUser selectUser(String id);
    List<BaseUser> selectUsersWhereType(BaseUserType type);
    int insertUser(BaseUser account);
}
