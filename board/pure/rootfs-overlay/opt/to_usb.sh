#!/bin/sh

cp -f /etc/asound.botic /etc/asound.conf
sed -i 's/serconfig=..../serconfig=MMMM/' /boot/uEnv.txt
sed -i 's/am335x-boneblack-botic.dtb/am335x-boneblack.dtb/' /boot/uEnv.txt
sed -i 's/BOTIC/USB/' /boot/uEnv.txt
echo USB > /etc/output
sync
reboot -f









