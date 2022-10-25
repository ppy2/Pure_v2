#!/bin/sh

cd /etc/init.d
PLAYER=`ls S90*|grep -v -E 'upmpdcli|aprenderer'`
/etc/init.d/$PLAYER stop
/etc/init.d/$PLAYER start
