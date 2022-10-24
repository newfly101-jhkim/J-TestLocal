package io.aetherit.project.base.repository;

import io.aetherit.project.base.repository.mapper.UserMapper;
import io.aetherit.project.base.model.BaseUser;
import io.aetherit.project.base.model.support.BaseUserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {
    private UserMapper mapper;

    @Autowired
    public UserRepository(UserMapper mapper) {
        this.mapper = mapper;
    }

    public BaseUser selectUser(String id) {
        return mapper.selectUser(id);
    }

    public List<BaseUser> selectUsers(BaseUserType type) {
        return mapper.selectUsersWhereType(type);
    }

    public int insertUser(BaseUser user) {
        return mapper.insertUser(user);
    }
}
