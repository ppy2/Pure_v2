#!/bin/sh

# If installing "Little Red Riding Hood" cape
grep -q 0 /sys/class/gpio/gpio60/value && exit

echo 1 > /sys/class/gpio/gpio113/value
echo "leave streaming mode" > /tmp/naa.log
echo "stop" > /tmp/roon.log

while :
do

# Mute for HQPlayer
 if   pidof networkaudiod > /dev/null 2>&1; then
      RUN_NAA=`tail -n1 /tmp/naa.log | grep "ALSA engine running"`
      STOP_NAA=`tail -n20 /tmp/naa.log | grep "leave streaming mode"`
      if [ -n "$RUN_NAA" ] ; then
      echo 0 > /sys/class/gpio/gpio113/value
      : > /tmp/naa.log
      elif [ -n "$STOP_NAA" ] ; then
      echo 1 > /sys/class/gpio/gpio113/value
      : > /tmp/naa.log
      fi

# Mute for Roon
 elif
      pidof raat_app > /dev/null 2>&1; then
      RUN_RAAT=`tail -n5 /tmp/roon.log | grep "Playing"`
      STOP_RAAT=`tail -n5 /tmp/roon.log | grep -E "\"request\":\"stop\"|\"request\":\"end_stream\""`
      SIZE="$(wc -c </tmp/roon.log)"
      if [ -n "$RUN_RAAT" ] ; then
      echo 0 > /sys/class/gpio/gpio113/value
      test 200000 -le $SIZE && : > /tmp/roon.log
      elif [ -n "$STOP_RAAT" ] ; then
      echo 1 > /sys/class/gpio/gpio113/value
      test 200000 -le $SIZE && : > /tmp/roon.log
      fi

# Mute for any Alsa DSD striming
 else
    if grep -q 'format' /proc/asound/Botic/pcm0p/sub0/hw_params 
	then
	    echo 0 > /sys/class/gpio/gpio113/value
        else
	    echo 1 > /sys/class/gpio/gpio113/value
    fi
 fi

sleep 0.4
done



