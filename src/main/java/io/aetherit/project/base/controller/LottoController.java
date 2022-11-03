package io.aetherit.project.base.controller;

import io.aetherit.project.base.exception.BaseException;
import io.aetherit.project.base.exception.ErrorCode;
import io.aetherit.project.base.model.LottoData;
import io.aetherit.project.base.model.LottoRandom;
import io.aetherit.project.base.service.LottoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/v1/lotto")
public class LottoController {
    private LottoService lottoService;

    @Autowired
    public LottoController(LottoService lottoService){
        this.lottoService = lottoService;
    }

    @PostMapping("/{lottoId}")
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
        if (lotto == null) {
            log.warn("[LottoService] Getting lotto Data is NULL");
            throw new BaseException(ErrorCode.NullData, "@RequestBody is NULL");
        } else {
            return lottoService.createNewLotto(lotto);
        }
    }

    @GetMapping("")
    public List<LottoData> getLottoList(HttpServletRequest httpRequest) {
        final List<LottoData> lotto = lottoService.getLottoList();
        log.debug("[LottoService] select LottoDataList=>{}",lotto);

        return lotto;
    }

    @GetMapping("/mylotto")
    public List<LottoRandom> getMyRandomLotto(HttpServletRequest httpRequest,
                                              @RequestParam(value = "expDrawId") String expDrawId,
                                              @RequestParam(value = "userId") String userId) {
        log.debug("[LottoController] userId ={}, expDrawId={}",userId,expDrawId);

        return lottoService.getUserRandomLotto(expDrawId, userId);
    }

    @PutMapping("/create/random")
    public LottoRandom insertRandomLotto(HttpServletRequest httpRequest, @RequestBody LottoRandom lottoRandom) {
        log.debug("[LottoController] get User's Random Lotto Data List ={}",lottoRandom);
        if (lottoRandom == null) {
            log.warn("[LottoController] User's Random Lotto Data is null");
            throw new BaseException(ErrorCode.NullData, "@RequestBody is NULL");
        } else {
            return lottoService.createNewRandomLotto(lottoRandom);
        }
    }

}
