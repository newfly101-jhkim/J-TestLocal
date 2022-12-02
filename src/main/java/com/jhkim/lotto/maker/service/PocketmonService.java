package com.jhkim.lotto.maker.service;

import com.jhkim.lotto.maker.model.PocketmonDogam;
import com.jhkim.lotto.maker.repository.PocketmonRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PocketmonService {
    private static final Logger logger = LoggerFactory.getLogger(LottoService.class);

    private PocketmonRepository repository;

    @Autowired
    public PocketmonService(PocketmonRepository repository) {this.repository = repository;}

    public PocketmonDogam getDogam(String name) { return repository.selectName(name); }

    public List<PocketmonDogam> getDogamList() { return repository.selectList(); }


}
