package com.homemonitor.homemonitor.controller;

import java.util.Map;
import java.util.TreeMap;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GoogleChartsController {

    @GetMapping("/hello")
    public String getPieChart(Model model) {
        Map<String, Integer> graphData = new TreeMap<>();
        graphData.put("15:30:00", 21);
        graphData.put("15:30:05", 20);
        graphData.put("15:30:10", 19);
        graphData.put("15:30:15", 19);
        graphData.put("15:30:20", 20);
        graphData.put("15:30:25", 21);
        graphData.put("15:30:30", 22);
        graphData.put("15:30:35", 23);
        graphData.put("15:30:40", 23);
        graphData.put("15:30:45", 22);
        graphData.put("15:30:50", 21);
        graphData.put("15:30:55", 20);
        graphData.put("15:31:00", 19);
        graphData.put("15:31:05", 18);
        graphData.put("15:31:10", 18);
        graphData.put("15:31:15", 18);
        model.addAttribute("chartData", graphData);
        return "hello";
    }
}
