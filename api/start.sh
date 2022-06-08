#! /bin/bash
source ~/.profile
pm2 show ghost -m | grep status | grep online > /dev/null
RUNNING=$?

if [ "${RUNNING}" -ne 0 ]; then
  pm2 start ghost
fi;

