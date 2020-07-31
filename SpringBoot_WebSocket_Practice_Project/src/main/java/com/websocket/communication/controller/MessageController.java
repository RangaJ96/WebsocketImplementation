package com.websocket.communication.controller;

import com.websocket.communication.domin.GreetingMessage;
import com.websocket.communication.domin.User;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;


@Controller
public class MessageController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public GreetingMessage greeting(User websocketUSer) throws Exception{
        Thread.sleep(1000);
        return new GreetingMessage("Hello, " + HtmlUtils.htmlEscape(websocketUSer.getName()) + "!");
    }

}
