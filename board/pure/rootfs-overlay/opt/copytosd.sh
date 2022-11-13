#!/bin/sh

nice -n 19 /opt/led.sh&

export DISK=/dev/mmcblk0
dd if=/dev/mmcblk1 of=${DISK} bs=1M count=550
sync ; sleep 1
partprobe ${DISK}
sync 
mount ${DISK}p1 /mnt
sed -i 's/mmcblk1p1/mmcblk0p1/' /mnt/boot/uEnv.txt
sync
umount /mnt

killall led.sh
echo 0 > /sys/class/leds/beaglebone\:green\:usr0/brightness
echo 0 > /sys/class/leds/beaglebone\:green\:usr1/brightness
echo 0 > /sys/class/leds/beaglebone\:green\:usr2/brightness
echo 0 > /sys/class/leds/beaglebone\:green\:usr3/brightness














