#!/bin/bash

ls js/ | grep .js | cut -d'.' -f1 | while read line; do
	uglifyjs js/"$line.js" -c -m -o js/"$line.min.js"
done

