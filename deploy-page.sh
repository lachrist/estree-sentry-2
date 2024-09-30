
npx typedoc

git branch -D gh-pages
git checkout --orphan gh-pages
git reset
echo "disable jekyll" > .nojekyll
git add -f typedoc
git commit -m "deploy to GitHub pages"
git push -f origin gh-pages
git checkout -f main
