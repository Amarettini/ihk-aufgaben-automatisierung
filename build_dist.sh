#!/bin/bash

echo "$PWD";

cd ./frontend/

npm install

npm run build

cd ../
rm -r ./backend/python/templates/*
sudo mv ./frontend/build/* ./backend/python/templates/

echo "Created and moved distrubution to ./backend/python/templates/"

