package com.jhkim.lotto.maker.repository;


import com.jhkim.lotto.maker.repository.mapper.ServerManagementMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ServerManagementRepository {
    private ServerManagementMapper mapper;

    @Autowired
    public ServerManagementRepository(ServerManagementMapper mapper) {this.mapper = mapper;}
}
