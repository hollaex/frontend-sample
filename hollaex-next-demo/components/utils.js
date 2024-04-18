export const getNetworkNameByKey = (network) => {
	if (network) {
		switch (network) {
			case 'eth':
				return 'ERC20';
			case 'trx':
				return 'TRC20';
			case 'bnb':
				return 'BEP20';
			case 'klay':
				return 'Klaytn';
			case 'matic':
				return 'Polygon';
			case 'sol':
				return 'Solana';
			case 'xlm':
				return 'Stellar';
			default:
				return network.toUpperCase();
		}
	} else {
		return network;
	}
};