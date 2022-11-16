package com.jhkim.lotto.maker.controller;


import com.jhkim.lotto.maker.service.ServerManagementService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@Slf4j
@RequestMapping("api/v1/serverManage")
public class ServerManagementController {
    private ServerManagementService serverManagementService;

    @Autowired
    public ServerManagementController(ServerManagementService serverManagementService) { this.serverManagementService = serverManagementService;}

    @PostMapping
    public void MakeProcessBuilder(HttpServletRequest httpRequest) throws IOException {
        serverManagementService.runShellScript();
        log.debug("eeeeeeeeeeeeeeee");
    }

}
