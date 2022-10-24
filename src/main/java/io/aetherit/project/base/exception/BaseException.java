package io.aetherit.project.base.exception;

import org.springframework.http.HttpStatus;

public class BaseException extends RuntimeException {
    private ErrorCode code;
    
    public BaseException(ErrorCode code, String message) {
        super(message);
        
        this.code = code;
    }
    
    public ErrorCode getErrorCode() {
        return this.code;
    }
}