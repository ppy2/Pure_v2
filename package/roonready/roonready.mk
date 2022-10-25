################################################################################
#
# roonready
#
################################################################################

define ROONREADY_INSTALL_TARGET_CMDS
	$(INSTALL) -D -m 0755 $(BR2_EXTERNAL_PURE_PATH)/package/roonready/raat_app  $(TARGET_DIR)/opt/RoonReady/raat_app
	$(INSTALL) -D -m 0755 $(BR2_EXTERNAL_PURE_PATH)/package/roonready/raatool  $(TARGET_DIR)/opt/RoonReady/raatool
	$(INSTALL) -D -m 0755 $(BR2_EXTERNAL_PURE_PATH)/package/roonready/startroon.sh  $(TARGET_DIR)/opt/RoonReady/startroon.sh
endef

$(eval $(generic-package))
