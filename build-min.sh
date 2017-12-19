#!/usr/bin/env bash


echo > dist/delib.js

for f in src/*.js; do

	echo ">>>> read :: $f"
	cat $f >> dist/delib.js

done

echo 
echo "---- make :: dist/delib.js"
echo "---- make :: dist/delib-min.js"
echo "---- Done!"
echo 
echo 

java -jar "tools/yuicompressor-2.4.8.jar" "dist/delib.js" -o "dist/delib.min.js" --charset utf-8
