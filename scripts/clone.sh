#!/bin/bash

# target folder: 与整个项目同级的public
cd ../public/papers || mkdir '../public/papers'

# init
git init

# clone
git clone git@github.com:Rabbit-Timi/blog-papers.git