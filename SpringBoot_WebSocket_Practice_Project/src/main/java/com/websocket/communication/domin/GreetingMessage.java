package com.websocket.communication.domin;


public class GreetingMessage {

    private String content;

    public GreetingMessage(){
        super();
    }

    public GreetingMessage(String messageContent) {
        this.content = messageContent;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
