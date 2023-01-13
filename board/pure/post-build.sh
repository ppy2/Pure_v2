#!/bin/sh

cp -f $BR2_EXTERNAL_PURE_PATH/board/pure/uEnv.txt $BINARIES_DIR/uEnv.txt
cp -f $BR2_EXTERNAL_PURE_PATH/board/pure/interfaces $BINARIES_DIR/interfaces
mv $BINARIES_DIR/zImage	$BINARIES_DIR/USB
rm -f $TARGET_DIR/etc/init.d/*shairport-sync
rm -f $TARGET_DIR/etc/init.d/*upmpdcli
rm -f $TARGET_DIR/etc/init.d/*urandom
rm -f $TARGET_DIR/etc/init.d/*mpd
rm -f $TARGET_DIR/etc/init.d/*mdev
rm -f $TARGET_DIR/etc/init.d/S41dhcpcd
rm -f -r $TARGET_DIR/etc/alsa
DATE=`date +"%d.%m.%Y"`
echo "uprclautostart = 1" > $TARGET_DIR/etc/upmpdcli.conf
echo "friendlyname = PureOS" >> $TARGET_DIR/etc/upmpdcli.conf
sed -i 's/^socks4.*/socks5 5.181.76.125 52993 dastereo oeretsad/g' $TARGET_DIR/etc/proxychains.conf
sed -i "s/ver.<\/span>/ver. $DATE<\/span>/g" $TARGET_DIR/var/www/tabs.php
sed -i "s/console::respawn/#console::respawn/g" $TARGET_DIR/etc/inittab
echo " " >> $TARGET_DIR/var/www/tabs.php

