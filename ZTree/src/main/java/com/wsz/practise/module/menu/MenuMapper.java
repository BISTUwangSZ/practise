package com.wsz.practise.module.menu;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MenuMapper {
    List<MenuCondition>  getMenuList(MenuCondition menu);

    Integer updateMenu(MenuCondition menu);

    Integer addMenu(MenuCondition menu);

    Integer deleteMenu(MenuCondition menu);
}
