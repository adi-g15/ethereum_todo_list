## Ethereum Todo List DApp

Made following through **https://www.youtube.com/watch?v=coQ5dg8wM2o**

This is a 'webapp' todo list application storing the state on blockchain (so 'dapp)', and run on the ethereum currency.

### Setting Up

You need to setup three things:
* truffle \[install from npm/yarn\]
* [ganache](https://www.trufflesuite.com/ganache) (or ganache-cli), starts a blockchain network on your pc with some ethers already for use \[if on Arch linux both are available through AUR too\]
* [Metamask](https://addons.mozilla.org/en-GB/firefox/addon/ether-metamask/) browser extension (if on Chrome, search in chrome web store), we need it to 'connect' to the blockchain network

> Project Specific: I have used [parcel](npmjs.com/package/parcel) to serve the html and javascript, you should install that too

### Start

Then, install dependencies with yarn or npm,
then `yarn dev` or `npm run dev`, to start the server

> Note: Make sure you are logged in Metamask, and have added the 1st account (for simplicity here, this webapp assumes that) you see on ganache. For that, go to Import Account, then paste the private key (in ganache-cli, private keys are listed on console) and on GUI, you have to click that key icon on far right of the first account. Or, see it in the youtube tutorial itself

