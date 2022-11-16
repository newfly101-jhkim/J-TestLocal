package com.jhkim.lotto.maker.controller;


import com.jhkim.lotto.maker.service.ServerManagementService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("api/v1/serverManage")
public class ServerManagementController {
    private ServerManagementService serverManagementService;

    @Autowired
    public ServerManagementController(ServerManagementService serverManagementService) { this.serverManagementService = serverManagementService;}


}
