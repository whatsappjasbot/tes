echo run
git add .
echo Run git cimmit
git commit -am "make"
echo deploy heroku
git push heroku master