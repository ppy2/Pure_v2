#!/bin/sh

nice -n 19 /opt/led.sh&

export DISK=/dev/mmcblk1
dd if=/dev/zero of=${DISK} bs=1M count=20
dd if=/opt/backup/MLO of=${DISK} count=1 seek=1 bs=128k
dd if=/opt/backup/u-boot.img of=${DISK} count=2 seek=1 bs=384k
sync ; sleep 1

fdisk -u ${DISK} <<EOF
n
p
1
8192
+512M
a
1
p
w
EOF

partprobe
sync ; sleep 1

mkfs.ext4 -F -L rootfs -O ^metadata_csum,^64bit ${DISK}p1
sync ; sleep 1


mount ${DISK}p1 /mnt
rsync -av --numeric-ids  --exclude='/proc' --exclude='/sys' --exclude='/mnt'  / /mnt/
mkdir /mnt/proc /mnt/sys /mnt/boot/dtbs /mnt/mnt
mv /mnt/boot/*.dtb  /mnt/boot/dtbs/
rm /mnt/boot/MLO /mnt/boot/u-boot.img

cp /opt/backup/uEnv.txt /mnt/boot/
echo "" >> /mnt/boot/uEnv.txt
grep "optargs="  /boot/uEnv.txt  >>  /mnt/boot/uEnv.txt

sync
poweroff
