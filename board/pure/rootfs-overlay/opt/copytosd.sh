#!/bin/sh

/opt/led.sh&
renice -n 19 `pidof led.sh`
renice 0 -u root

if test -e /dev/mmcblk0 
then
    dd if=/dev/zero of=/dev/mmcblk0 bs=1M count=10
    dd if=/opt/backup/MLO of=/dev/mmcblk0 count=1 seek=1 bs=128k
    dd if=/opt/backup/u-boot.img of=/dev/mmcblk0 count=2 seek=1 bs=384k
    sync ; sleep 1 
    echo -e "o\n n\n p\n 1\n 8192\n +512M\n a\n 1\n w" | fdisk /dev/mmcblk0
    sleep 2 ; sync 
    partprobe /dev/mmcblk0
    sleep 2 ; sync
    mkfs.ext4 -F -L rootfs -O ^metadata_csum,^64bit /dev/mmcblk0p1
    mount /dev/mmcblk0p1 /mnt 
    rsync -a --numeric-ids  --exclude='/proc' --exclude='/sys' --exclude='/mnt'  / /mnt/
    mkdir -p /mnt/proc /mnt/sys /mnt/mnt /mnt/boot/dtbs
    cp /mnt/boot/dtbs/*.dtb /mnt/boot/
    sed -i 's/mmcblk1/mmcblk0/' /mnt/boot/uEnv.txt
    sync ; sleep 1
    umount /mnt
fi

killall led.sh
echo 0 > /sys/class/leds/beaglebone\:green\:usr0/brightness
echo 0 > /sys/class/leds/beaglebone\:green\:usr1/brightness
echo 0 > /sys/class/leds/beaglebone\:green\:usr2/brightness
echo 0 > /sys/class/leds/beaglebone\:green\:usr3/brightness

