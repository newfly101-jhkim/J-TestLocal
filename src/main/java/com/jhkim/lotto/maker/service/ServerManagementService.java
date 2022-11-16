package com.jhkim.lotto.maker.service;

import com.jhkim.lotto.maker.controller.shellscript.ScriptRunner;
import com.jhkim.lotto.maker.repository.ServerManagementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServerManagementService {
    private static final Logger logger = LoggerFactory.getLogger(ServerManagementService.class);

    private ServerManagementRepository repository;

    private static ScriptRunner shRunner = new ScriptRunner();


    @Autowired
    public ServerManagementService(ServerManagementRepository repository) {this.repository = repository;}

    public void runShellScript() {
        shRunner.runScript();
    }
}
