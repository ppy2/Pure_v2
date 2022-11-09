#!/bin/sh

chattr -i /etc/asound.conf
cp -f /etc/asound.botic /etc/asound.conf
sed -i 's/serconfig=..../serconfig=SS--/' /boot/uEnv.txt
sed -i 's/USB/BOTIC/' /boot/uEnv.txt
sed -i 's/am335x-boneblack.dtb/am335x-boneblack-botic.dtb/' /boot/uEnv.txt
echo SS-- > /sys/module/snd_soc_botic/parameters/serconfig
echo SPDIF > /etc/output
/etc/rc.pure/S10mute stop > /dev/null 2>&1
chattr +i /etc/asound.conf
sync
reboot 




