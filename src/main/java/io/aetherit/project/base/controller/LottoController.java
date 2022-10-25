package io.aetherit.project.base.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api/v1/lotto/")
public class LottoController {

//    @Autowired
//    public LottoController(){
//        null;
//    }

    @GetMapping("/dhlottery")
    public String proxy() {
        System.out.println("proxy");
        return "dhlottery";
    }
}
