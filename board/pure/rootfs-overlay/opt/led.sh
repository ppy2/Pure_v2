#!/bin/sh

while true;
do
echo 1 > /sys/class/leds/beaglebone\:green\:usr0/brightness
sleep 0.1
echo 1 > /sys/class/leds/beaglebone\:green\:usr1/brightness
sleep 0.1
echo 1 > /sys/class/leds/beaglebone\:green\:usr2/brightness
sleep 0.1
echo 1 > /sys/class/leds/beaglebone\:green\:usr3/brightness
sleep 0.1
echo 0 > /sys/class/leds/beaglebone\:green\:usr0/brightness
sleep 0.1
echo 0 > /sys/class/leds/beaglebone\:green\:usr1/brightness
sleep 0.1
echo 0 > /sys/class/leds/beaglebone\:green\:usr2/brightness
sleep 0.1
echo 0 > /sys/class/leds/beaglebone\:green\:usr3/brightness
sleep 0.1
echo 1 > /sys/class/leds/beaglebone\:green\:usr3/brightness
sleep 0.1
echo 1 > /sys/class/leds/beaglebone\:green\:usr2/brightness
sleep 0.1
echo 1 > /sys/class/leds/beaglebone\:green\:usr1/brightness
sleep 0.1
echo 1 > /sys/class/leds/beaglebone\:green\:usr0/brightness
sleep 0.1
echo 0 > /sys/class/leds/beaglebone\:green\:usr3/brightness
sleep 0.1
echo 0 > /sys/class/leds/beaglebone\:green\:usr2/brightness
sleep 0.1
echo 0 > /sys/class/leds/beaglebone\:green\:usr1/brightness
sleep 0.1
echo 0 > /sys/class/leds/beaglebone\:green\:usr0/brightness
sleep 0.1;
done;