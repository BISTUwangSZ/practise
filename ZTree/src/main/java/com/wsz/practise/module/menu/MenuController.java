package com.wsz.practise.module.menu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/menu")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @RequestMapping("/toMenuView")
    public String toMenuView(){
        return "/menu/ztree_menu";
    }

    @RequestMapping("/getMenuList")
    @ResponseBody
    public List<Map<String,String>> getMenuList(HttpServletRequest request, MenuCondition menu) {
        return menuService.getMenuList(menu);
    }

    @RequestMapping("/addMenu")
    @ResponseBody
    public Integer addMenu(HttpServletRequest request, @RequestBody MenuCondition menu) {
        return menuService.addMenu(menu);
    }

    @RequestMapping("/deleteMenu")
    @ResponseBody
    public Integer deleteMenu(HttpServletRequest request, @RequestBody MenuCondition menu) {
        return menuService.deleteMenu(menu);
    }

    @RequestMapping("/updateMenu")
    @ResponseBody
    public Integer updateMenu(HttpServletRequest request, @RequestBody MenuCondition menu) {
        return menuService.updateMenu(menu);
    }
}
