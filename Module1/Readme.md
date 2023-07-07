# Introduction
Module 1 contains files for Creating an app. This App provides the following Funcionalities 

Organizations can register themself and create their own token on Etherial blockchain. 

Once the organization is created, they can enroll token holders for vesting. 

Shakeholders can withdraw their token after the vesting period.

### Follow Bellow stpes to setup the project
Install next.js in your locally machine. using ```npm i -g create-next-app```
- then run ```npx create-next-app@latest```
- give a project name for me its vesting_app
- Would you like to use TypeScript with this project? Yes
- Would you like to use ESLint with this project? yes
- Would you like to use Tailwind CSS with this project? »yes


Use `cd vesting_app` (Go to the newly created project folder for me its vesting_app)

then run `npm install -D tailwindcss postcss autoprefixer`

`npx tailwindcss init –p`


`npm init`


name the project same as the name you did when created the app using `npx create-next-app storage-frontend `.for me its ‘vestine_app’


use `npm install --save-dev hardhat` to install hardhat 


delete the tsconfig.json file


`npx hardhat`  = it will creates a new hardhat file

then run ```npm install --save-dev "hardhat@^2.16.1" "@nomicfoundation/hardhat-toolbox@^3.0.0"```

then select the create a typescript project


Now create a pages folder within the the project folder 


Delete the page file locatied in the app folder of your project


Now create two folder within the pages folder called admin and client.


Now create file same as admin and client folders of this git repo and copy one by one the file contects from the admin and client folders of this git repo to your files. 

## Project execution and Deployment
Copy the file name of unfer contracts forlder on git repo and create a file within the contracts folder in your project directory with the coppied name with .sol extension


Now copy the smartcontract file contains to your newly created smartcontract


Now go to the scripts folder and copy the deploy.js file contant from git repo your local deploy.ts file

Now create 3 terminals 

On the 2nd terminal use `npx hardhat node` to create and start etheream blockchain network locally

On the 3rd terminal use `npx hardhat run --network localhost ./scripts/deploy.ts` to deploy your contract on the local blolkchain

now on the 1st terminal use `npm run dev` to start the project

### Usage Tutorial
use this video to get a understand of how my app works
https://www.loom.com/share/4c3532f3833647cd93abfe839567c464?sid=961eb156-763b-47d6-9dfc-ae32cc8e18ea
## Authors

Contributors names and contact info

Sarbaseesh Ganguly gmail-sarbaseeshganguly@gmail.com
Discord profile address - BNXS_G#6637

