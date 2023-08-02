#!/bin/bash

if [ -d "../public/papers" ];then
  echo "/public/papers文件夹存在"
  exit 1;
else
  echo "文件夹不存在"
  mkdir '../public/papers'
  cd ../public/papers
  # init
  git init
  # clone 到本地
  git remote add origin git@github.com:Rabbit-Timi/blog-papers.git
  git pull
  git checkout -b main origin/main
fi
