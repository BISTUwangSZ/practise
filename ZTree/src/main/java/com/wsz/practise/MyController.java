package com.wsz.practise;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/a")
public class MyController {

    @RequestMapping("/view")
    public String toView(){
        return "test";
    }

    @RequestMapping("/getInfo")
    @ResponseBody
    public Object getInfo(){
        return "info";
    }
}
