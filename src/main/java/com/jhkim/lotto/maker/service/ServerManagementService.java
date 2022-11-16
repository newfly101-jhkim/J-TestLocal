package com.jhkim.lotto.maker.service;

import com.jhkim.lotto.maker.repository.ServerManagementRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
public class ServerManagementService {
    private static final Logger logger = (Logger) LoggerFactory.getLogger(ServerManagementService.class);

    private ServerManagementRepository repository;

    @Autowired
    public ServerManagementService(ServerManagementRepository repository) {this.repository = repository;}
}
