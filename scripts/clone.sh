#!/bin/bash

# target folder: 与整个项目同级的public
cd ../public/papers || { echo "cd failed"; exit 1; }

# pull clover
git clone https://github.com/Rabbit-Timi/blog-papers.git