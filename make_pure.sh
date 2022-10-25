#!/bin/bash

# Custom Buildroot linux image Pure (http://puredsd.ru/).

#git clone https://github.com/buildroot/buildroot.git
cd buildroot
#git checkout 3f0ee529083e972be9893676fab00ac50c2816c3
make BR2_EXTERNAL=../ pure_defconfig

make


