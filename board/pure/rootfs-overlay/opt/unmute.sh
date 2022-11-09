#!/bin/bash

######## additional GPIO mute pin for DSC2 ###################
echo 0 > /sys/class/gpio/gpio113/value
##############################################################

MIXER=`amixer 2>/dev/null| awk -F "'" 'NR==1 {print $2; exit}'`
/usr/bin/amixer set "$MIXER" unmute

