// Replace with the actual ABI of your smart contract
const ABI = [
//ABI
]; // ABI array here

// Replace with the actual contract address
const contractAddress = 'CA'; // Contract address here

document.addEventListener("DOMContentLoaded", async () => {
	// Connect Wallet Button
	const connectButton = document.getElementById('connectButton');
	const connectedWalletElement = document.getElementById('connectedWallet');

	// Stick Figure Section
	const stickFigureElement = document.getElementById('stickFigure');

	// Buy Section
	const buyGreenHeadButton = document.getElementById('buyGreenHead');
	const buyGreenTorsoButton = document.getElementById('buyGreenTorso');
	const buyGreenLegsButton = document.getElementById('buyGreenLegs');

	let web3 = null;
	let contract = null;
	let connectedWalletAddress = null;

	// Connect Wallet
	connectButton.addEventListener('click', async () => {
		if (window.ethereum) {
			web3 = new Web3(window.ethereum);
			await window.ethereum.enable();
			const accounts = await web3.eth.getAccounts();
			connectedWalletAddress = accounts[0];
			connectedWalletElement.textContent = `Connected Wallet: ${connectedWalletAddress}`;
			contract = new web3.eth.Contract(ABI, contractAddress);
			updateOwnedParts();
		} else {
			console.error('Ethereum provider not detected');
		}
	});

	// Buy Green Head
	buyGreenHeadButton.addEventListener('click', async () => {
		await buyGreenHead();
	});

	// Buy Green Torso
	buyGreenTorsoButton.addEventListener('click', async () => {
		await buyGreenTorso();
	});

	// Buy Green Legs
	buyGreenLegsButton.addEventListener('click', async () => {
		await buyGreenLegs();
	});

	// Buy Green Head
	async function buyGreenHead() {
		try {
			const costInWei = web3.utils.toWei('0.01', 'ether');
			await contract.methods.buyGreenHead().send({ from: connectedWalletAddress, value: costInWei });
			updateOwnedParts();
		} catch (error) {
			console.error('Error buying green head:', error);
		}
	}

	// Buy Green Torso
	async function buyGreenTorso() {
		try {
			const costInWei = web3.utils.toWei('0.01', 'ether');
			await contract.methods.buyGreenTorso().send({ from: connectedWalletAddress, value: costInWei });
			updateOwnedParts();
		} catch (error) {
			console.error('Error buying green torso:', error);
		}
	}

	// Buy Green Legs
	async function buyGreenLegs() {
		try {
			const costInWei = web3.utils.toWei('0.01', 'ether');
			await contract.methods.buyGreenLegs().send({ from: connectedWalletAddress, value: costInWei });
			updateOwnedParts();
		} catch (error) {
			console.error('Error buying green legs:', error);
		}
	}

	// Update the user's owned parts
	async function updateOwnedParts() {
		try {
			const accounts = await ethereum.request({ method: 'eth_accounts' });
			if (accounts.length === 0) {
				console.log('No connected wallet');
				return;
			}

			const connectedWallet = accounts[0];
			const hasGreenHead = await contract.methods.hasGreenHead(connectedWallet).call();
			const hasGreenTorso = await contract.methods.hasGreenTorso(connectedWallet).call();
			const hasGreenLegs = await contract.methods.hasGreenLegs(connectedWallet).call();

			const ownedParts = [];
			if (hasGreenHead) {
				ownedParts.push('Green Head');
			}
			if (hasGreenTorso) {
				ownedParts.push('Green Torso');
			}
			if (hasGreenLegs) {
				ownedParts.push('Green Legs');
			}

			// Declare and initialize ownedPartsElement
			const ownedPartsElement = document.getElementById('ownedParts');
			ownedPartsElement.textContent = `Owned Parts: ${ownedParts.join(', ')}`;

			// Call createStickFigure function
			const stickFigureElement = document.getElementById('stickFigure');
			stickFigureElement.textContent = ''; // Clear the existing stick figure
			createStickFigure(ownedParts);
		} catch (error) {
			console.error('Error fetching owned parts:', error);
		}
	}

// Create Stick Figure with color based on owned parts
function createStickFigure(ownedParts) {
    const head = ownedParts.includes("Green Head") ? "<span style='color:green;'>   O</span>" : "   O";
    const torso = ownedParts.includes("Green Torso") ? "<span style='color:green;'>  /|\\</span>" : "  /|\\";
    const legs = ownedParts.includes("Green Legs") ? "<span style='color:green;'>  / \\<span>" : "  / \\";

    const stickFigureElement = document.getElementById('stickFigure');
    stickFigureElement.innerHTML = `<pre>${head}\n${torso}\n${legs}</pre>`;
}

});
