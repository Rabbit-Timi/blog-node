#!/bin/bash

# target folder: 与整个项目同级的public
cd ../public/papers || mkdir '../public/papers'

# init
git init

# clone 到本地
git remote add origin git@github.com:Rabbit-Timi/blog-papers.git
git pull
git checkout -b main origin/main