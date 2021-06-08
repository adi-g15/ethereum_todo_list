/*
 * What are migrations ? 
 *
 * Consider databases, we may have to change its state, like adding colums, tables, schema etc.
 *
 * When we deploy a smart contract to the blockchain, we are actually changing the blockchain state
 * Blockchain is a big database in one sense
 * Since we are changing the state, we need a migration in order to do that
 *
 *
 * Truffle Specific - The numbering of the migration is in order as in file name
 * */

const TodoList = artifacts.require("./TodoList.sol");

module.exports = (deployer) => deployer.deploy(TodoList);
