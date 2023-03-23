## "Pure" firmware for BeagleBone

![image](https://user-images.githubusercontent.com/33607921/111271068-c02b6e00-8641-11eb-98d7-ee5cf3860a91.png)


Audio endpoint for NAA, RAAT, UPNP, AirPlay, LMS, Spotify Connect, TidalConnect and multicast
streaming. This firmware supports three types of output - USB, I2S and SPDIF. The Botic7 driver settings
for the I2S bus are located in the /boot/uEnv.txt file in the “optargs =” line. For more detailed information on driver
parameters, you can refer to the official driver support page - http://bbb.ieero.com
The launch is possible both from SD and from internal eMMC memory. When the system is fully booted, all LEDs will turn off.

The firmware has standard user settings via the web interface http://pure.local \
Shell access - root/root
Support for this firmware - https://t.me/pure_os

### Build firmware 

./make_pure.sh 

After successful compilation, the SD image will be located in buildroot/output/images/Pure_XX_XX_202X.gz. 

To organize your own rsync update server, you need to replace the /opt/update file with your own script.


