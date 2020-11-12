package com.wsz.practise.module.menu;

import lombok.Data;

import java.io.Serializable;

@Data
public class MenuCondition implements Serializable{
    private String id;
    private String menuName;
    private String fatherId;
    private Integer state;
}
