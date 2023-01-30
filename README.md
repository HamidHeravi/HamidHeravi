## Hi there 👋

## setup project for E2E tests by this commands
- npm int(run this command in your project folder)
- npm install selenium-webdriver
- npm install mocha
- npm install chai
- npm install chromedriver --chromedriver_version=LATEST


## edit package.json file
- open package.json and edit this line
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
  
 to this:
 
 "scripts": {
    "test": "mocha"
  }


## run file
- for run file run this command: npm test


## for API test I used from super test
### for runing API test you should install the following packages in a separate project:
- Command to install packages - npm i --save-dev supertest mocha chai @babel/cli @babel/core @babel/node @babel/register @babel/preset-env
- you should create .mocharc.yaml and put this line in it: require: '@babel/register'
- you should create .babelrc and put this line in it: { "presets": ["@babel/preset-env"] }
