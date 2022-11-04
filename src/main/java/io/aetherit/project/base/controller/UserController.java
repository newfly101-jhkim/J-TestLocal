package io.aetherit.project.base.controller;


import io.aetherit.project.base.exception.BaseException;
import io.aetherit.project.base.exception.ErrorCode;
import io.aetherit.project.base.model.BaseUser;
import io.aetherit.project.base.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@Slf4j
@RequestMapping("/api/v1/user")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {this.userService = userService;}

    @PostMapping("")
    public void modifyUser(HttpServletRequest httpRequest, @RequestBody BaseUser userInfo) {
        log.debug("userInfo ={}", userInfo);
        if (userInfo == null) {
            log.warn("[LottoController] User's Random Lotto Data is null");
            throw new BaseException(ErrorCode.NotAcceptableId, "@RequestBody is notAcceptable, check body");
        }else {
            userService.ModifyUser(userInfo);
        }


    }
}
