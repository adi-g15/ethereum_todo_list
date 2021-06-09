class App {
	async load() {
		// also loads the account
		await this.enableEthereum();
	}	

	async enableEthereum() {
		// Will start the metamask extension
		const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
		const account = accounts[0];

		console.log("Your Ethereum Account: ", account);
	}
}

const app = new App()

// document.isLoaded then
app.load()

