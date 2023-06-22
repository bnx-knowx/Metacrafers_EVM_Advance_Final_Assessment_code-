# Introduction
Module 1 contains files for Creating an app where we can Organizations can register them self and create their own token on Etherial blockchain. Once the organization is created, it enroll token holders for vesting. Shakeholders can withdraw their token after the vesting period.

### Follow bollow stpes to setup the project
Install next.js in your locally machine.
npx create-next-app@latest 
- Would you like to use TypeScript with this project? Yes
- Would you like to use ESLint with this project? yes
- Would you like to use Tailwind CSS with this project? »yes
Use cd vesting_app (Go to the newly created project folder for me its vesting_app)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init –p
npm init
name the project same as the name you did when created the app using ” npx create-next-app storage-frontend”.for me its ‘vestine_app’
npm install --save-dev hardhat
delete the tsconfig.json file
npx hardhat  = it will creates a new hardhat file
-then select the create a typescript project
Now create a pages folder within the the project folder 
Delete the page file locatied in the app folder of your project
Now create two folder within the pages folder called admin and client.
Now create file same as admin and client folders of this git repo and copy one by one the file contects from the admin and client folders of this git repo to your files. 
