package io.aetherit.project.base.controller;

import io.aetherit.project.base.exception.BaseException;
import io.aetherit.project.base.exception.ErrorCode;
import io.aetherit.project.base.model.LottoData;
import io.aetherit.project.base.service.LottoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

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
    public LottoData getLottoData(HttpServletRequest httpRequest, @PathVariable String lottoId) {
        final LottoData lottoData = lottoService.getLotto(lottoId);
        log.debug("[LottoService] getLottoData() @PathVariable => lottoData={}",lottoData);
        if (lottoData == null ) {
            log.warn("[LottoService] Can't find that lotto drawId={} in DataBase",lottoId);
            throw new BaseException(ErrorCode.NoLottoData, "No lotto Data is in DataBase");
        } else {
            return lottoData;
        }
    }

    @PutMapping("/create")
    public LottoData insertLottoData(HttpServletRequest httpRequest, @RequestBody LottoData lotto) {
        log.debug("[LottoService] insertLottoData() @RequestBody => lottoData={}",lotto);
        return lottoService.createNewLotto(lotto);
    }
}
