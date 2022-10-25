################################################################################
#
# tidalconnect
#
################################################################################

define TIDALCONNECT_INSTALL_TARGET_CMDS
        $(INSTALL) -D -m 0755 $(BR2_EXTERNAL_PURE_PATH)/package/tidalconnect/tcon $(TARGET_DIR)/usr/bin/tcon
        $(INSTALL) -D -m 0755 $(BR2_EXTERNAL_PURE_PATH)/package/tidalconnect/start_tc $(TARGET_DIR)/usr/bin/start_tc
        $(INSTALL) -D -m 0664 $(BR2_EXTERNAL_PURE_PATH)/package/tidalconnect/tcon.crt $(TARGET_DIR)/etc/ssl/private/tcon.crt
endef

$(eval $(generic-package))
