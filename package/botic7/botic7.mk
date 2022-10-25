################################################################################
#
# botic7
#
################################################################################

BOTIC7_VERSION = 4.9.147-ti-rt-r121
BOTIC7_SITE = $(call github,beagleboard,linux,$(BOTIC7_VERSION))
BOTIC7_CFLAGS = $(TARGET_CFLAGS)
BOTIC7_LDFLAGS = $(TARGET_LDFLAGS)
BOTIC7_KCONFIG_FILE = $(BOTIC7_PKGDIR)/config

BOTIC7_MAKE_ENV = \
	$(TARGET_MAKE_ENV) \
	CFLAGS="$(BOTIC7_CFLAGS)" \
	CFLAGS_botic7="$(BOTIC7_CFLAGS_botic7)"

BOTIC7_MAKE_OPTS = \
	AR="$(TARGET_AR)" \
	NM="$(TARGET_NM)" \
	RANLIB="$(TARGET_RANLIB)" \
	CC="$(TARGET_CC)" \
	ARCH=$(NORMALIZED_ARCH) \
	PREFIX="$(TARGET_DIR)" \
	EXTRA_LDFLAGS="$(BOTIC7_LDFLAGS)" \
	CROSS_COMPILE="$(TARGET_CROSS)" \
	CONFIG_PREFIX="$(TARGET_DIR)" \
	SKIP_STRIP=y

BOTIC7_KCONFIG_SUPPORTS_DEFCONFIG = NO
BOTIC7_KCONFIG_EDITORS = menuconfig xconfig gconfig
BOTIC7_KCONFIG_OPTS = $(BOTIC7_MAKE_OPTS)

define BOTIC7_BUILD_CMDS
	$(BOTIC7_MAKE_ENV) $(MAKE) $(BOTIC7_MAKE_OPTS) -C $(@D)
endef

define BOTIC7_INSTALL_TARGET_CMDS
	$(INSTALL) $(@D)/arch/arm/boot/zImage $(BINARIES_DIR)/BOTIC
	$(INSTALL) $(@D)/arch/arm/boot/dts/am335x-boneblack-botic.dtb $(BINARIES_DIR)/am335x-boneblack-botic.dtb
endef

$(eval $(kconfig-package))
