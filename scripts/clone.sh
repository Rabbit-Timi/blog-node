#!/bin/bash

# target folder: 与整个项目同级的public
cd ../public || mkdir '../public'

# init
git init

# clone
git clone git@github.com:Rabbit-Timi/blog-papers.git