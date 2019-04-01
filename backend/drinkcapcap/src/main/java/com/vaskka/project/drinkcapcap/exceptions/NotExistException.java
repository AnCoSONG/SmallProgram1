package com.vaskka.project.drinkcapcap.exceptions;

/**
 * @program: drinkcapcap
 * @description: NotExistException
 * @author: Vaskka
 * @create: 2019/4/1 3:35 PM
 **/

public class NotExistException extends DrinkCapcapBaseException {

    private Object notExistReference;

    public NotExistException(String message) {
        super(message);
    }

    public NotExistException(String message, Object notExistReference) {
        super(message);
        this.notExistReference = notExistReference;
    }

    public Object getNotExistReference() {
        return notExistReference;
    }

}
