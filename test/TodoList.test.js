const TodoList = artifacts.require("./TodoList.sol");

contract("TodoList", (acc) => {
	before(async () => {
		this.todolist = await TodoList.deployed();
	})

	it("deploys successfully", async () => {
		const addr = await this.todolist.address;

		// we use the 'is not' startegy here, just remove all wrong possibilities
		assert.notEqual(addr, 0x0);
		assert.notEqual(addr, '');
		assert.notEqual(addr, null); 
		assert.notEqual(addr, undefined);
	})

	it("list tasks", async () => {
		const num_tasks = await this.todolist.num_tasks();
		const task = await this.todolist.tasks(num_tasks);	// here we are directly passing a "Big Number" to .tasks() as index (Sahi hai :D)

		assert.equal(task.id.toNumber(), num_tasks.toNumber()-1)
	})

	it("create task", async () => {
		const res = await this.todolist.createTask("Ek aur task")
		// const num_tasks = await this.todolist.num_tasks()

		// assert.equal(num_tasks,2); // This isn't affected by, say i added two new tasks from console, the test starts from the state in the constructors itself, where we had added one todo already)
	
		const event_log = res.logs[0];
		const event = event_log.args

		// assert.equal(event.id.toNumber(), 2-1)
		
	})
})
