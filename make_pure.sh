#!/bin/bash

# Custom Buildroot linux image Pure (http://puredsd.ru/).

git clone https://github.com/buildroot/buildroot.git
cd buildroot
git checkout 3f0ee529083e972be9893676fab00ac50c2816c3
make BR2_EXTERNAL=../ pure_defconfig
sed -i '/disable-jack/d' package/alsa-plugins/alsa-plugins.mk
sed -i 's/1.2.6/1.2.2/'  package/alsa-plugins/alsa-plugins.mk
rm -f package/alsa-plugins/alsa-plugins.hash
make


