#!/bin/bash

# target folder: 与整个项目同级的public
cd ../public || { echo "cd failed"; exit 1; }

# pull
git pull