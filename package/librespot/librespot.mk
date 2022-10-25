################################################################################
#
# librespot
#
################################################################################

LIBRESPOT_VERSION = 0.4.2
LIBRESPOT_SOURCE = v$(LIBRESPOT_VERSION).tar.gz
LIBRESPOT_SITE = https://github.com/librespot-org/librespot/archive/refs/tags
LIBRESPOT_CARGO_BUILD_OPTS = --no-default-features --features "alsa-backend"


$(eval $(cargo-package))



