#!/bin/sh

chattr -i /etc/asound.conf
cp -f /etc/asound.+-i2slr /etc/asound.conf
sed -i 's/serconfig=..--/serconfig=MMMM/' /boot/uEnv.txt
sed -i 's/USB/BOTIC/' /boot/uEnv.txt
sed -i 's/am335x-boneblack.dtb/am335x-boneblack-botic.dtb/' /boot/uEnv.txt
echo MMMM > /sys/module/snd_soc_botic/parameters/serconfig
echo "+-I2SLR" > /etc/output
chattr +i /etc/asound.conf
sync
reboot -f

