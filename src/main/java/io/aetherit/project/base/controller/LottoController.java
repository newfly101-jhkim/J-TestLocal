package io.aetherit.project.base.controller;

import io.aetherit.project.base.model.LottoData;
import io.aetherit.project.base.service.LottoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@Slf4j
@RequestMapping("/api/v1/lotto/")
public class LottoController {
    private LottoService lottoService;

    @Autowired
    public LottoController(LottoService lottoService){
        this.lottoService = lottoService;
    }

    @PostMapping
    public ResponseEntity<LottoData> getLottoData(HttpServletRequest httpRequest, HttpSession session, @RequestBody LottoData lotto) {
        final LottoData lottoData = lottoService.getLotto(lotto.getDrawId());

        return new ResponseEntity<>(lottoData, HttpStatus.OK);
    }

    @PutMapping("")
    public LottoData insertLottoData(HttpServletRequest httpRequest, @RequestBody LottoData lottoData) {
        return lottoService.createNewLotto(lottoData);
    }
}
