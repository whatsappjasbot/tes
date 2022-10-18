heroku ps:stop wolker
git add .
git commit -am "make"
git push heroku master
heroku ps:scale worker=1