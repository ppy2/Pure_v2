#!/bin/sh

sleep 0.2
renice `cat /etc/nice.conf` -u pure


