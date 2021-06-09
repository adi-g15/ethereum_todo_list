pragma solidity ^0.5.0;

// Whenever we add/change new functions, we have to 'truffle migrate --reset'. Don't forget :D
contract TodoList {
    uint public num_tasks = 0;	// state variable, storage on blockchain

    struct Task {
	uint 	id;
	string 	content;
	bool 	is_completed;
    }

    mapping(uint => Task) public tasks;	// we need to access this like 'await todolist.tasks(1)' ie. we need to pass index inside the parenthesis, as it is dynamically sized...
					// Interesting: I tried invalid index (1 more than size), it still returned an object though numbers are 0, strings empty, and bools false

    constructor() public {
	createTask("Vande Mataram");
    }

    function createTask(string memory _content) public { // the underscore naming convention here, is for 'non-state' variables (ie. local variables), just a convention not mandatory

	// Task memory _new_task = Task(num_tasks, _content, true);	// Data location must be 'storage' or 'memory' for variables 
	// tasks[num_tasks] = _new_task;

	tasks[num_tasks] = Task(num_tasks, _content, true);

	num_tasks ++;

    }
}
