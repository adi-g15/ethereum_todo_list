import TruffleContract from "../node_modules/@truffle/contract";
import detectProvider from "@metamask/detect-provider";	// https://docs.metamask.io/guide/ethereum-provider.html
import todolist_json from "../build/contracts/TodoList.json";

class App {
	async load() {
		// detects most providers injected at window.ethereum
		// From Metamask- The presence of the provider object indicates an Ethereum user. We recommend using @metamask/detect-provider (opens new window) to detect our provider, on any platform or browser.
		const provider = await detectProvider();
		if (provider) {
			// From now on, this should always be true:
			// provider === window.ethereum
			
			// continue with loading app
		} else {
			alert("Please Install Metamask!");
		}

		// also loads the account
		await this.enableEthereum();
		await this.loadContract();	// next step to load the contract (using the .json file, we get after compiling the .sol files)
	}	

	async enableEthereum() {
		// Will start the metamask extension
		const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
		const account = accounts[0];

		if(!account) {
			document.getElementById("account").innerText = "Failed to Login";
		}

		this.account = account;
		console.log("Your Ethereum Account: ", account);
		const acc_p = document.getElementById("account");
		acc_p.innerText = "Logged in as:  " + account;
	}

	async loadContract() {
		// const todolist_json = await fetch("TodoList.json").then(res => res.json());	// ${smart_contract_file_name}.json
		//console.log(todolist_contract)
		console.log(todolist_json);
		this.contracts = {
			TodoList: TruffleContract(todolist_json)
		}
		console.log(this.contracts)
		
		// const deployed_contract = await .deployed();
	}
}

const app = new App()

// document.isLoaded then
app.load()

