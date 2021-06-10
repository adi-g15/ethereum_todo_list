import TruffleContract from "../node_modules/@truffle/contract";
import detectProvider from "@metamask/detect-provider";	// https://docs.metamask.io/guide/ethereum-provider.html
import todolist_json from "../build/contracts/TodoList.json";

class TodoList {
	todolist = [];
	raw_list = [];	// raw data, as returned by the blockchain

	constructor(app) {
		this.TodoListContract = app.todolist;
		this.account = app.account;

		(async () => await this.sync())();
	}

	async sync() {
		const num_tasks = (await this.TodoListContract.num_tasks()).toNumber();
		const todos = document.getElementById("todos");

		todos.innerText = '';
		for(let i=0; i<num_tasks; ++i) {
			const raw_task = await this.TodoListContract.tasks(i);
			this.raw_list.push(raw_task);
			this.todolist.push({
				id: raw_task[0].toNumber(),	// no await required here, it's already the bignumber
				content: raw_task[1],
				is_completed: raw_task[2]
			});


			const li = document.createElement("li");
			li.innerText = raw_task[1];
			todos.appendChild(li);
		}
	}

	async add(content) {
		debugger
		/*
		 * The result object of this transaction
		 *
		 * {
		 *	tx: transation_hash,
		 *	receipt: {transactionHash, blockHash, blockNumber, from, to, gasUsed, cumulativeGasUsed, contractAddress, logs: [], status: bool, logsBloom, rawLogs: []}
		 * 	logs: []	// this array contains list of events emitted
		 * }
		 * */
		const created_task = await this.TodoListContract.createTask(content, {from: this.account});

		await this.sync();
	}

	async toggle_completed(index) {
		await this.TodoListContract.toggleCompleted(index);
		this.todolist[index].completed = !this.todolist[index].completed;
	}
}

class App {
	async load() {
		// detects most providers injected at window.ethereum
		// From Metamask- The presence of the provider object indicates an Ethereum user. We recommend using @metamask/detect-provider (opens new window) to detect our provider, on any platform or browser.
		const provider = await detectProvider();
		if (provider) {
			this.provider = provider;
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
		//console.log(todolist_json);
		this.contracts = {
			TodoList: TruffleContract(todolist_json)
		}	// loaded the truffle contract
		//console.log(this.contracts)
		
		this.contracts.TodoList.setProvider(this.provider);
		this.todolist = await this.contracts.TodoList.deployed();

		/* MAIN PART DONE, we called deployed() on the TodoList contract, and got access to it, now it's mostly like what we do at console */
	
		this.list = new TodoList(this);
		window.list = this.list;

		// console.log(this.todolist)
		
		// const deployed_contract = await .deployed();
	}

	async createTask() {
		const content = document.getElementById("new_task").value;

		this.list.add(content);
	}
}

var app = new App()
window.app = app;
// document.isLoaded then
app.load()

