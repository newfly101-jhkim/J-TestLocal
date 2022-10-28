USE world;

##
## for Spring Session
##
CREATE TABLE SPRING_SESSION (
    PRIMARY_ID CHAR(36) NOT NULL,
    SESSION_ID CHAR(36) NOT NULL,
    CREATION_TIME BIGINT NOT NULL,
    LAST_ACCESS_TIME BIGINT NOT NULL,
    MAX_INACTIVE_INTERVAL INT NOT NULL,
    EXPIRY_TIME BIGINT NOT NULL,
    PRINCIPAL_NAME VARCHAR(100),

    CONSTRAINT SPRING_SESSION_PK PRIMARY KEY (PRIMARY_ID)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC;

CREATE UNIQUE INDEX SPRING_SESSION_IX1 ON SPRING_SESSION (SESSION_ID);
CREATE INDEX SPRING_SESSION_IX2 ON SPRING_SESSION (EXPIRY_TIME);
CREATE INDEX SPRING_SESSION_IX3 ON SPRING_SESSION (PRINCIPAL_NAME);


CREATE TABLE SPRING_SESSION_ATTRIBUTES (
    SESSION_PRIMARY_ID CHAR(36) NOT NULL,
    ATTRIBUTE_NAME VARCHAR(200) NOT NULL,
    ATTRIBUTE_BYTES BLOB NOT NULL,

    CONSTRAINT SPRING_SESSION_ATTRIBUTES_PK PRIMARY KEY (SESSION_PRIMARY_ID, ATTRIBUTE_NAME),
    CONSTRAINT SPRING_SESSION_ATTRIBUTES_FK FOREIGN KEY (SESSION_PRIMARY_ID) REFERENCES SPRING_SESSION(PRIMARY_ID) ON DELETE CASCADE
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC;


##
## for Application
##
CREATE TABLE base_users (
    id                      NVARCHAR(64)        NOT NULL,
    password                NVARCHAR(128)       NOT NULL,
    name                    NVARCHAR(64)        NOT NULL,
    type                    VARCHAR(32)         NOT NULL,
    is_enabled              CHAR(1)             NOT NULL,
    created_datetime        DATETIME            NOT NULL,
    updated_datetime        DATETIME            NOT NULL,

    CONSTRAINT users_pk                      PRIMARY KEY (id)
) ENGINE InnoDB CHARACTER SET utf8 COLLATE utf8_unicode_ci;

CREATE TABLE lotto_data (
    draw_id                  NVARCHAR(64)        NOT NULL,
    draw_datetime            NVARCHAR(32)        NOT NULL,
    first_prise_money        NVARCHAR(32)        NOT NULL,
    first_prise_member       NVARCHAR(32)        NOT NULL,
    first_prise_per_money    NVARCHAR(32)        NOT NULL,
    lotto_no1                NVARCHAR(2)         NOT NULL,
    lotto_no2                NVARCHAR(2)         NOT NULL,
    lotto_no3                NVARCHAR(2)         NOT NULL,
    lotto_no4                NVARCHAR(2)         NOT NULL,
    lotto_no5                NVARCHAR(2)         NOT NULL,
    lotto_no6                NVARCHAR(2)         NOT NULL,
    lotto_no7_bonus          NVARCHAR(2)         NOT NULL,
    total_sell_amount        NVARCHAR(32)        NOT NULL,
    created_datetime         DATETIME            NOT NULL,

    CONSTRAINT lotto_pk                     PRIMARY KEY (draw_id)
) ENGINE InnoDB CHARACTER SET utf8 COLLATE utf8_unicode_ci;
