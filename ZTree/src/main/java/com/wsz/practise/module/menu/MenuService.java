package com.wsz.practise.module.menu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MenuService {

    @Autowired
    private MenuDao menuDao;

    public List<Map<String,String>> getMenuList(MenuCondition menu) {
        List<MenuCondition> list = menuDao.getMenuList(menu);
        List<Map<String,String>> res = new ArrayList<>();
        for (MenuCondition condition : list){
            Map<String,String> map = new HashMap<>();
            map.put("name",condition.getMenuName());
            map.put("pId",condition.getFatherId());
            map.put("id",condition.getId());
            res.add(map);
        }
        return res;
    }

    public Integer addMenu(MenuCondition menu) {
        return menuDao.addMenu(menu);
    }

    public Integer deleteMenu(MenuCondition menu) {
        return menuDao.deleteMenu(menu);
    }

    public Integer updateMenu(MenuCondition menu) {
        return menuDao.updateMenu(menu);
    }
}
