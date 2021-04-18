CREATE TABLE
    landing_template
(
    template_id varchar(36) NOT NULL,
    description text        NOT NULL,
    PRIMARY KEY (template_id)
) ENGINE = INNODB;


CREATE TABLE
    client
(
    client_id varchar(36)  NOT NULL,
    name      varchar(255) NOT NULL default '',
    PRIMARY KEY (client_id)
) ENGINE = INNODB;

CREATE TABLE
    client_landing
(
    unique_id       varchar(36) NOT NULL,
    client_id       varchar(36) NOT NULL,
    template_id     varchar(36) NOT NULL,
    landing_choices json        NOT NULL,
    PRIMARY KEY (unique_id),
    FOREIGN KEY (client_id) REFERENCES client (client_id),
    FOREIGN KEY (template_id) REFERENCES landing_template (template_id)
) ENGINE = INNODB;

CREATE TABLE
    client_auth
(
    unique_id          varchar(36) NOT NULL,
    client_id          varchar(36) NOT NULL,
    login_type         varchar(25) NOT NULL,
    login_type_options json        NOT NULL,
    PRIMARY KEY (unique_id),
    FOREIGN KEY (client_id) REFERENCES client (client_id)
) ENGINE = INNODB;

CREATE TABLE
    client_visitor_collected_data
(
    unique_id          varchar(36) NOT NULL,
    client_id          varchar(36) NOT NULL,
    visitor_identifier varchar(25) NOT NULL,
    raw_data           json        NOT NULL,
    createdAt          datetime    NOT NULL,
    updatedAt          datetime,
    PRIMARY KEY (unique_id),
    FOREIGN KEY (client_id) REFERENCES client (client_id)
) ENGINE = INNODB;

INSERT INTO landing_template
VALUES ('template-1', 'Products description with photos and text');
INSERT INTO landing_template
VALUES ('template-2', 'Iframe holding client own web');

INSERT INTO client
VALUES ('hotel-1', 'Example client. Fixed to look like a hotel');
INSERT INTO client
VALUES ('shopping-mall', 'Example client. Fixed to look like a mall');
INSERT INTO client
VALUES ('ikeallabea-shoppingmall', 'Example client. Fixed to look like an IKEA');


INSERT INTO client_auth
VALUES ('f498fe98-cc9f-4691-8216-cc98000fc789', 'hotel-1', 'survey', '
{
  "surveyForm": {
    "id": "hotel-1",
    "title": "Queremos ofrecerte el mejor servicio pero para eso necesitamos conocer tu impresión de nuestras instalaciones.No te preocupes, es totalmente anónima",
    "fields": [
      {
        "id": "1571507819",
        "type": "rating",
        "config": {
          "key": "rating",
          "label": "¿Cómo puntuarías la atención recibida al registrarse en el hotel (check in)?",
          "otherOptions": {
            "maximum": 5
          },
          "order": 1
        }
      },
      {
        "id": "1571508049",
        "type": "checkbox",
        "config": {
          "label": "¿Por qué nos elegiste?",
          "otherOptions": [
            {
              "index": 0,
              "key": "Precio"
            },
            {
              "index": 1,
              "key": "Ubicación"
            },
            {
              "index": 2,
              "key": "Disponibilidad"
            },
            {
              "index": 3,
              "key": "Comodidades (restaurant, gimnasio, servicio al cuarto, wifi, televisión, etc)"
            }
          ],
          "order": 2
        }
      },
      {
        "id": "1618755094",
        "type": "radio",
        "config": {
          "key": "yes-no",
          "label": "¿Cómo nos conociste?",
          "otherOptions": [
            {
              "key": "Busqueda en internet"
            },
            {
              "key": "Publicidad en televisión"
            },
            {
              "key": "Publicidad en redes sociales"
            },
            {
              "key": "Agencia"
            },
            {
              "key": "A través de un amigo"
            }
          ],
          "order": 3
        }
      },
      {
        "id": "1571508048",
        "type": "radio",
        "config": {
          "key": "yes-no",
          "label": "¿Cómo realizaste la reserva?",
          "otherOptions": [
            {
              "key": "Por teléfono"
            },
            {
              "key": "Por la página web del hotel"
            },
            {
              "key": "A través de una agencia"
            }
          ],
          "order": 4
        }
      },
      {
        "id": "1571507840",
        "type": "textbox",
        "config": {
          "key": "textbox",
          "otherOptions": {
            "textType": "text"
          },
          "label": "¿Desde que lugar nos visitas?",
          "required": true,
          "value": "Buenos Aires, Argentina",
          "order": 5
        }
      },
      {
        "id": "1618754905",
        "type": "radio",
        "config": {
          "key": "yes-no",
          "label": "¿Con qué motivo nos visitas?",
          "otherOptions": [
            {
              "key": "Trabajo"
            },
            {
              "key": "Viaje en pareja"
            },
            {
              "key": "Viaje en familia"
            },
            {
              "key": "Viaje con amistades"
            },
            {
              "key": "Otro motivo"
            }
          ],
          "order": 6
        }
      },
      {
        "id": "1618756289",
        "type": "radio",
        "config": {
          "key": "yes-no",
          "label": "¿Rango de edad que te describe a vos o la mayoría de las personas que viajan con vos?",
          "otherOptions": [
            {
              "key": "18-24"
            },
            {
              "key": "25-39"
            },
            {
              "key": "40-55"
            },
            {
              "key": "55 en adelante"
            }
          ],
          "order": 7
        }
      },
      {
        "id": "1571507880",
        "type": "textbox",
        "config": {
          "key": "textbox",
          "otherOptions": {
            "textType": "text"
          },
          "label": "¿Hay algo más que le gustaría decir o sugerir al hotel que no te hayamos preguntado en esta encuesta?",
          "value": "..",
          "required": false,
          "order": 8
        }
      }
    ]
  }
}
');

INSERT INTO client_auth
VALUES ('b56b48aa-3fda-41a0-8608-d14209a6a956', 'shopping-mall', 'social-login', '
{
  "socialMediaKeys": {
    "facebook": {
      "clientId": "131065570894352",
      "secret": "a74151d55bae152570b3a0e8874086db"
    },
    "google": {
      "clientId": "500143808314-9psv199snl4g7e6dargf6f8sog0023u1.apps.googleusercontent.com",
      "secret": "8oJHj4r0tCWBxJ_wTFNBOtD2"
    },
    "linkedin": {
      "clientId": "7795dtgk291ni1",
      "secret": "oBU1OUVw42FB7MWt"
    }
  }
}');

INSERT INTO client_landing
VALUES ('83bfedd1-5467-408c-86d3-146e1d9275ed', 'shopping-mall', 'template-1', '
{
  "leftColumn": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis at consectetur lorem donec massa. Non consectetur a erat nam at lectus urna duis. Quis blandit turpis cursus in hac. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt. Tristique senectus et netus et malesuada fames ac turpis. Dolor morbi non arcu risus quis varius quam quisque. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Sed augue lacus viverra vitae congue eu consequat ac. Curabitur vitae nunc sed velit dignissim. At lectus urna duis convallis convallis tellus id. Consequat ac felis donec et odio pellentesque diam.",
  "middleColumn": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis at consectetur lorem donec massa. Non consectetur a erat nam at lectus urna duis. Quis blandit turpis cursus in hac. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt. Tristique senectus et netus et malesuada fames ac turpis. Dolor morbi non arcu risus quis varius quam quisque. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Sed augue lacus viverra vitae congue eu consequat ac. Curabitur vitae nunc sed velit dignissim. At lectus urna duis convallis convallis tellus id. Consequat ac felis donec et odio pellentesque diam.",
  "rightColumn": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis at consectetur lorem donec massa. Non consectetur a erat nam at lectus urna duis. Quis blandit turpis cursus in hac. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt. Tristique senectus et netus et malesuada fames ac turpis. Dolor morbi non arcu risus quis varius quam quisque. Fames ac turpis egestas maecenas pharetra convallis posuere morbi. Sed augue lacus viverra vitae congue eu consequat ac. Curabitur vitae nunc sed velit dignissim. At lectus urna duis convallis convallis tellus id. Consequat ac felis donec et odio pellentesque diam."
}');

INSERT INTO client_landing
VALUES ('11111111-5467-408c-86d3-146e1d9275ed', 'hotel-1', 'template-2', '
{
  "iframeURL": "https://www.refugiodelpescador.com/",
  "title": "Fisher Cottage"
}');



###########################################################################
# $Id$                 #
#                                                                         #
#  schema.sql                       rlm_sql - FreeRADIUS SQL Module       #
#                                                                         #
#     Database schema for MySQL rlm_sql module                            #
#                                                                         #
#     To load:                                                            #
#         mysql -uroot -prootpass radius < schema.sql                     #
#                                                                         #
#                                   Mike Machado <mike@innercite.com>     #
###########################################################################
#
# Table structure for table 'radacct'
#

CREATE TABLE radacct
(
    radacctid           bigint(21) NOT NULL auto_increment,
    acctsessionid       varchar(64) NOT NULL default '',
    acctuniqueid        varchar(32) NOT NULL default '',
    username            varchar(64) NOT NULL default '',
    groupname           varchar(64) NOT NULL default '',
    realm               varchar(64)          default '',
    nasipaddress        varchar(15) NOT NULL default '',
    nasportid           varchar(50)          default NULL,
    nasporttype         varchar(32)          default NULL,
    acctstarttime       datetime NULL default NULL,
    acctupdatetime      datetime NULL default NULL,
    acctstoptime        datetime NULL default NULL,
    acctinterval        int(12) default NULL,
    acctsessiontime     int(12) unsigned default NULL,
    acctauthentic       varchar(32)          default NULL,
    connectinfo_start   varchar(50)          default NULL,
    connectinfo_stop    varchar(50)          default NULL,
    acctinputoctets     bigint(20) default NULL,
    acctoutputoctets    bigint(20) default NULL,
    calledstationid     varchar(50) NOT NULL default '',
    callingstationid    varchar(50) NOT NULL default '',
    acctterminatecause  varchar(32) NOT NULL default '',
    servicetype         varchar(32)          default NULL,
    framedprotocol      varchar(32)          default NULL,
    framedipaddress     varchar(15) NOT NULL default '',
    framedipv6address   varchar(45) NOT NULL default '',
    framedipv6prefix    varchar(45) NOT NULL default '',
    framedinterfaceid   varchar(44) NOT NULL default '',
    delegatedipv6prefix varchar(45) NOT NULL default '',
    PRIMARY KEY (radacctid),
    UNIQUE KEY acctuniqueid (acctuniqueid),
    KEY                 username (username),
    KEY                 framedipaddress (framedipaddress),
    KEY                 framedipv6address (framedipv6address),
    KEY                 framedipv6prefix (framedipv6prefix),
    KEY                 framedinterfaceid (framedinterfaceid),
    KEY                 delegatedipv6prefix (delegatedipv6prefix),
    KEY                 acctsessionid (acctsessionid),
    KEY                 acctsessiontime (acctsessiontime),
    KEY                 acctstarttime (acctstarttime),
    KEY                 acctinterval (acctinterval),
    KEY                 acctstoptime (acctstoptime),
    KEY                 nasipaddress (nasipaddress),
    INDEX               bulk_close (acctstoptime, nasipaddress, acctstarttime)
) ENGINE = INNODB;

#
# Table structure for table 'radcheck'
#

CREATE TABLE radcheck
(
    id        int(11) unsigned NOT NULL auto_increment,
    username  varchar(64)  NOT NULL default '',
    attribute varchar(64)  NOT NULL default '',
    op        char(2)      NOT NULL DEFAULT '==',
    value     varchar(253) NOT NULL default '',
    PRIMARY KEY (id),
    KEY       username (username(32))
);

#
# Table structure for table 'radgroupcheck'
#

CREATE TABLE radgroupcheck
(
    id        int(11) unsigned NOT NULL auto_increment,
    groupname varchar(64)  NOT NULL default '',
    attribute varchar(64)  NOT NULL default '',
    op        char(2)      NOT NULL DEFAULT '==',
    value     varchar(253) NOT NULL default '',
    PRIMARY KEY (id),
    KEY       groupname (groupname(32))
);

#
# Table structure for table 'radgroupreply'
#

CREATE TABLE radgroupreply
(
    id        int(11) unsigned NOT NULL auto_increment,
    groupname varchar(64)  NOT NULL default '',
    attribute varchar(64)  NOT NULL default '',
    op        char(2)      NOT NULL DEFAULT '=',
    value     varchar(253) NOT NULL default '',
    PRIMARY KEY (id),
    KEY       groupname (groupname(32))
);

#
# Table structure for table 'radreply'
#

CREATE TABLE radreply
(
    id        int(11) unsigned NOT NULL auto_increment,
    username  varchar(64)  NOT NULL default '',
    attribute varchar(64)  NOT NULL default '',
    op        char(2)      NOT NULL DEFAULT '=',
    value     varchar(253) NOT NULL default '',
    PRIMARY KEY (id),
    KEY       username (username(32))
);


#
# Table structure for table 'radusergroup'
#

CREATE TABLE radusergroup
(
    id        int(11) unsigned NOT NULL auto_increment,
    username  varchar(64) NOT NULL default '',
    groupname varchar(64) NOT NULL default '',
    priority  int(11) NOT NULL default '1',
    PRIMARY KEY (id),
    KEY       username (username(32))
);

#
# Table structure for table 'radpostauth'
#
# Note: MySQL versions since 5.6.4 support fractional precision timestamps
#        which we use here. Replace the authdate definition with the following
#        if your software is too old:
#
#   authdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON
#UPDATE CURRENT_TIMESTAMP
#

CREATE TABLE radpostauth
(
    id       int(11) NOT NULL auto_increment,
    username varchar(64)  NOT NULL default '',
    pass     varchar(64)  NOT NULL default '',
    reply    varchar(32)  NOT NULL default '',
    authdate timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP (6),
    PRIMARY KEY (id)
) ENGINE = INNODB;

#
# Table structure for table 'nas'
#
CREATE TABLE nas
(
    id          int(10) NOT NULL auto_increment,
    nasname     varchar(128)                  NOT NULL,
    shortname   varchar(32),
    type        varchar(30)  DEFAULT 'other',
    ports       int(5),
    secret      varchar(60)  DEFAULT 'secret' NOT NULL,
    server      varchar(64),
    community   varchar(50),
    description varchar(200) DEFAULT 'RADIUS Client',
    PRIMARY KEY (id),
    KEY         nasname (nasname)
);
