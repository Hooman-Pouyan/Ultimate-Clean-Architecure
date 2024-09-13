rm -rf node_modules
rm -rf package-lock.json
rm -rf yarn.lock
rm -rf dist
rm -rf .angular
npm cache clean --force
npm install
npm run build