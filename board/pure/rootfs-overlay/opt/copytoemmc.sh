#!/bin/sh

/opt/led.sh&
renice -n 19 `pidof led.sh`
renice 0 -u root
sleep 1
dd if=/dev/zero of=/dev/mmcblk1 bs=1M count=10
dd if=/opt/backup/MLO of=/dev/mmcblk1 count=1 seek=1 bs=128k
dd if=/opt/backup/u-boot.img of=/dev/mmcblk1 count=2 seek=1 bs=384k
sync ; sleep 1
echo -e "o\n n\n p\n 1\n 8192\n +512M\n a\n 1\n w" | fdisk /dev/mmcblk1 
sync ; sleep 1
partprobe /dev/mmcblk1 
sync ; sleep 1 
mkfs.ext4 -F -L rootfs -O ^metadata_csum,^64bit /dev/mmcblk1p1 
sync ; sleep 1
mount -t ext4 /dev/mmcblk1p1 /mnt && rsync -a --numeric-ids  --exclude='/proc' --exclude='/sys' --exclude='/mnt'  / /mnt/
mkdir -p /mnt/proc /mnt/sys /mnt/mnt /mnt/boot/dtbs
mv /mnt/boot/*.dtb /mnt/boot/dtbs/
cat /opt/backup/uEnv.txt > /mnt/boot/uEnv.txt
grep "optargs="  /boot/uEnv.txt  >>  /mnt/boot/uEnv.txt
grep -q USB /etc/output || sed -i 's/USB/BOTIC/' /mnt/boot/uEnv.txt 
grep -q USB /etc/output || sed -i 's/am335x-boneblack.dtb/am335x-boneblack-botic.dtb/' /mnt/boot/uEnv.txt
sync
umount /mnt 

killall led.sh
echo 0 > /sys/class/leds/beaglebone\:green\:usr0/brightness
echo 0 > /sys/class/leds/beaglebone\:green\:usr1/brightness
echo 0 > /sys/class/leds/beaglebone\:green\:usr2/brightness
echo 0 > /sys/class/leds/beaglebone\:green\:usr3/brightness




