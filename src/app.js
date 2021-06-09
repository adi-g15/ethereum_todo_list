class App {
	async load() {
		await this.loadWeb3();
		await this.loadAccount();
	}	

	async loadWeb3() {
		if(typeof web3 !== 'undefined') {
			this.web3Provider = web3.currentProvider;
			web3 = new Web3(web3.currentProvider);
		} else {
			alert("Please connect to Metamask");
		}

		// Modern dapp browsers...
		if (window.ethereum) {
			windows.web3 = new Web3(ethereum);
			try {
				// Request account access if needed
				await ethereum.enable();
				
				// Accounts now exposed
				web3.eth.sendTransaction({})
			} catch (err) {
				// User denied account access...
				alert("You probably Denied access. Can't continue...")
			}
		}
		// Legacy dapp browsers...
		else if (window.web3) {
			this.web3Provider = web3.currentProvider;
			window.web3 = new Web3(web3.currentProvider)

			// Accounts always exposed in legacy
			web3.eth.sendTransaction({})
		}
	}

	async loadAccount () {
		this.account = web3.eth.accounts[0];
		console.log("Ethereum Account: ", this.account);
	}
}

const app = new App()

// document.isLoaded then
app.load()

