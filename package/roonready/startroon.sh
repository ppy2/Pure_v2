#!/bin/sh

MAC=`cat /sys/class/net/eth0/address | tr 'a-z' 'A-Z'`
sed -i "s/^.*\"unique_id\".*/    \"unique_id\": \"$MAC\" ,/" /etc/raat.conf
nice -n -10 /opt/RoonReady/raat_app /etc/raat.conf > /tmp/roon.log 2>&1
