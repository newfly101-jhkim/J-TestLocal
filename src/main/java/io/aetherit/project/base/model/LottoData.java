package io.aetherit.project.base.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LottoData {
    private String drawId;
    private LocalDateTime drawDatetime;
    private String firstPriseMoney;
    private String firstPriseMember;
    private String firstPrisePerMoney;
    private String lottoNo1;
    private String lottoNo2;
    private String lottoNo3;
    private String lottoNo4;
    private String lottoNo5;
    private String lottoNo6;
    private String lottoNo7Bonus;
    private String result;
    private String totalSellAmount;
}

//    drawNo:        1010
//    drawNoDate:        "2022-04-09"
//    firstPrise:        24955040632
//    firstPriseMember:        8
//    firstPrisePerMoney:        3119380079
//    lottoNo1:        9
//    lottoNo2:        12
//    lottoNo3:        15
//    lottoNo4:        25
//    lottoNo5:        34
//    lottoNo6:        36
//    lottoNo7Bonus:        3
//    result:        "success"
//    totalSellAmount:        103011505000
