# Interaction programming tutorial (native version)
tutorial version 6

1. Install Node.js version 22 or 23 using nvm (Node Version Manager)

If you don't have nvm installed, install it first by following the instructions at: https://www.nvmnode.com/guide/download.html

Then start a new terminal window.

Install and use Node.js version 22 (Node.js 23 works as well):
```
nvm install 22
nvm use 22
```

2. After checkout execute
```
npm install
```

3. Run the Unit Tests which check your lab code:
```
npm run test
```
Press P to focus on tests with certain name patterns. You can also indicate a pattern in the command line:
```
npm run test tw1
```
You can also use a "vitest plugin" in Visual Studio Code to see test status in a graphical user interface rather than command line.

/!\ Changing code may break earlier tests. Make sure to often run all tests!

4. To test your app User Interface, start Expo:
```
npm run expo
```
Install the Expo app on your phone, scan the QR code to run the app on your phone. Alternatively you can run on a simulator, see lab instructions.

5. Make sure that your function names and parameter names follow the **obligatory** [lab coding conventions](https://docs.google.com/presentation/d/1CtxiAG9mJ6kslSl6psBBlVDafFD4b2Rh2G7ft1GQ08o/edit#slide=id.g17644a78da5_0_174)

6. To update to the most recent Unit Tests:
```
npm install @iprog/test@latest
```
## Installation problems?
File [an issue](https://gits-15.sys.kth.se/iprog/issues).
