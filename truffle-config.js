module.exports = {
	networks: {
		development: {
			host: "127.0.0.1",
			port: 7545,
			network_id: "*"
		}
	},
	solc: {
		optimizer: {	// In tutorial this was enabled, i disabled it, optimisation not needed in dev
			enabled: false
		}
	}
}
