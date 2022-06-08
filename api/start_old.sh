#! /bin/bash
source ./.bashrc
nvm use v8.1.3
DATE=`date +%Y-%m-%d:%H:%M:%S`

if ! pm2 list | grep -q API; then
    cd ~/api/v2
    pm2 start src/ -i 4 --name API -- --colors

    echo "The api servers were started - "$DATE >> /home/clients/072b6d82c967647a4c51cd6fee54ffe0/logs/start-log.txt

    mail -s "API server was started" salaun@onoci.net <<< "The API server was started by the .sh script - "$DATE" - Check that everything is working"
fi


if ! pm2 list | grep -q Assets; then
    cd ~/api/assets
    pm2 start app.js --name Assets
    echo "The Assets server started - "$DATE >> /home/clients/072b6d82c967647a4c51cd6fee54ffe0/logs/start-log.txt

    mail -s "Assets server was started" salaun@onoci.net <<< "The Assets server was started by the .sh script - "$DATE" - Check that everything is working"
fi