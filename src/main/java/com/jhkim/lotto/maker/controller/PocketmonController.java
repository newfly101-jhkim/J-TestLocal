package com.jhkim.lotto.maker.controller;

import com.jhkim.lotto.maker.model.PocketmonDogam;
import com.jhkim.lotto.maker.service.PocketmonService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/v1/pokemon")
public class PocketmonController {
    private PocketmonService pocketmonService;

    @Autowired
    public PocketmonController(PocketmonService pocketmonService) {this.pocketmonService = pocketmonService;}

    @GetMapping("")
    public List<PocketmonDogam> getPocketmonDogam(HttpServletRequest httpServletRequest) {
        final List<PocketmonDogam> dogam = pocketmonService.getDogamList();
        log.debug("[PocketmonController] select getPocketmonDogam=>{}",dogam);
        return dogam;
    }
}
