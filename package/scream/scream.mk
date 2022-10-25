################################################################################
#
# scream
#
################################################################################

SCREAM_VERSION = 3.5
SCREAM_SOURCE = $(SCREAM_VERSION).tar.gz
SCREAM_SITE = https://github.com/duncanthrax/scream/archive/refs/tags
SCREAM_SUBDIR = Receivers/unix
#SCREAM_INSTALL_TARGET = YES

define SCREAM_INSTALL_TARGET_CMDS
	$(INSTALL) -D -m 0755 $(@D)/$(SCREAM_SUBDIR)/scream $(TARGET_DIR)/usr/sbin/scream
endef

$(eval $(cmake-package))

