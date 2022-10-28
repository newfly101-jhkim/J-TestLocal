package io.aetherit.project.base.controller;

import io.aetherit.project.base.exception.BaseException;
import io.aetherit.project.base.exception.ErrorCode;
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

    @PostMapping("{lottoId}")
    public LottoData getLottoData(HttpServletRequest httpRequest, HttpSession session, @PathVariable String lottoId) {
        final LottoData lottoData = lottoService.getLotto(lottoId);
        log.debug("lottoData={}",lottoData);
        if (lottoData == null ) {
            throw new BaseException(ErrorCode.NoLottoData, "No lotto Data is in DataBase");
        } else {
            return lottoData;
        }
    }

    @PutMapping("/create")
    public LottoData insertLottoData(HttpServletRequest httpRequest, @RequestBody LottoData lotto) {
        log.debug("get lotto Data={}",lotto);
        return lottoService.createNewLotto(lotto);
    }
}
