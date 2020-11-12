package com.wsz.practise.module.menu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MenuDao{

    @Autowired
    private MenuMapper mapper;

    public List<MenuCondition> getMenuList(MenuCondition menu) {
        return mapper.getMenuList(menu);
    }

    public Integer addMenu(MenuCondition menu) {
        return mapper.addMenu(menu);
    }

    public Integer deleteMenu(MenuCondition menu) {
        return mapper.deleteMenu(menu);
    }

    public Integer updateMenu(MenuCondition menu) {
        return mapper.updateMenu(menu);
    }
}
