echo "コメントよろしくぅ！"
read str
git add .
git commit -m ${str}
git branch -M main
git remote add origin https://github.com/shimakaru/test_heroku.git
git push -u origin main