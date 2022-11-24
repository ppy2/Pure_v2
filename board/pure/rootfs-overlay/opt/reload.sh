#!/bin/sh

cd /etc/init.d
PLAYER=`ls S90*|grep -v -E 'upmpdcli'`
/etc/init.d/$PLAYER stop
/etc/init.d/$PLAYER start
renice `grep '\-u pure' /var/www/tabs.php |awk '{ print $5}'` -u pure
