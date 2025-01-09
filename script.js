let validators = {};
let totalVotingPower = 0;
let availableValidators = [];
let currentPage = 1;
const itemsPerPage = 20;
let scrolledToBottom = false;
let realTimeEpoch = 0;

// Fetch validators and populate data on load
fetchAvailableValidators();
fetchTotalVotingPower();
fetchRealTimeEpoch();

function fetchAvailableValidators() {
    fetch('https://indexer-mainnet-namada.grandvalleys.com/api/v1/pos/validator/all?state=consensus')
        .then(response => response.json())
        .then(data => {
            availableValidators = data.map(validator => ({
                name: validator.name,
                votingPower: parseInt(validator.votingPower) // Ensure votingPower is an integer
            }));
            // Sort validators by voting power in descending order
            availableValidators.sort((a, b) => b.votingPower - a.votingPower);
            populateValidatorDropdown();
            updateValidatorsTable();
        })
        .catch(console.error);
}

function fetchTotalVotingPower() {
    fetch('https://indexer-mainnet-namada.grandvalleys.com/api/v1/pos/voting-power')
        .then(response => response.json())
        .then(data => {
            totalVotingPower = parseInt(data.totalVotingPower); // Ensure totalVotingPower is an integer
        })
        .catch(console.error);
}

function fetchRealTimeEpoch() {
    fetch('https://indexer-mainnet-namada.grandvalleys.com/api/v1/chain/epoch/latest')
        .then(response => response.json())
        .then(data => {
            realTimeEpoch = parseInt(data.epoch); // Ensure realTimeEpoch is an integer
            updateEpochDropdown();
            updateValidatorsTable();
            updateResultsTable();
            document.getElementById("realTimeEpochValue").textContent = realTimeEpoch; // Update the real-time epoch value in the header
        })
        .catch(console.error);
}

function populateValidatorDropdown() {
    const validatorSelect = document.getElementById("validatorSelect");
    validatorSelect.innerHTML = '<option value="">Select Validator</option>';
    availableValidators.forEach(validator => {
        const option = document.createElement("option");
        option.value = validator.name;
        option.textContent = validator.name;
        validatorSelect.appendChild(option);
    });
}

function syncVotingPower() {
    const selectedValidatorName = document.getElementById("validatorSelect").value;
    const selectedValidator = availableValidators.find(validator => validator.name === selectedValidatorName);
    document.selectedValidatorVotingPower = selectedValidator ? selectedValidator.votingPower : null;
    document.getElementById("selectedVotingPower").textContent = `Selected Voting Power: ${selectedValidator ? selectedValidator.votingPower : ''}`;
}

function addValidator() {
    const name = document.getElementById("validatorSelect").value;
    const epoch = parseInt(document.getElementById("epoch").value);
    const infractions = parseInt(document.getElementById("infractions").value);

    if (!name || isNaN(epoch) || isNaN(infractions)) {
        alert("Please fill in all fields.");
        return;
    }

    if (epoch < realTimeEpoch - 1 || epoch > realTimeEpoch + 1) {
        alert("Please enter an epoch within the range of the real-time epoch.");
        return;
    }

    if (!document.selectedValidatorVotingPower) {
        alert("Invalid voting power for the selected validator.");
        return;
    }

    validators[name] = { epoch, infractions, votingPower: document.selectedValidatorVotingPower };
    updateValidatorsTable();
    updateResultsTable();
}

function resetForm() {
    document.getElementById("validatorSelect").value = "";
    document.getElementById("epoch").value = "";
    document.getElementById("infractions").value = "";
    document.getElementById("selectedVotingPower").textContent = "Selected Voting Power: ";
    syncVotingPower();
}

function removeValidator(name) {
    if (validators[name]) {
        delete validators[name];
        updateValidatorsTable();
        updateResultsTable();
    }
}

function updateEpochDropdown() {
    const epochSelect = document.getElementById("epoch");
    epochSelect.innerHTML = ''; // Clear existing options

    // Add options for epoch-1, epoch, and epoch+1
    const epochOptions = [realTimeEpoch - 1, realTimeEpoch, realTimeEpoch + 1];
    epochOptions.forEach(epoch => {
        const option = document.createElement("option");
        option.value = epoch;
        option.textContent = `Epoch ${epoch}`;
        epochSelect.appendChild(option);
    });
}

function updateValidatorsTable() {
    const tableBody = document.querySelector(".validator-table tbody");
    tableBody.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, availableValidators.length);

    for (let i = startIndex; i < endIndex; i++) {
        const validator = availableValidators[i];
        const fvp = (validator.votingPower / totalVotingPower) * 100; // Convert to percentage
        const fractionalVotingPower = validator.votingPower / totalVotingPower;
        const cubicSlashRate = 9 * (fractionalVotingPower ** 2);
        const independentCSR = Math.max(cubicSlashRate, 0.01);

        // Ensure the Independent CSR is at least 1% and not more than 100%
        const finalIndependentCSR = Math.min(Math.max(independentCSR * 100, 1), 100).toFixed(2);

        tableBody.innerHTML += `<tr>
            <td>${validator.name}</td>
            <td>${validator.votingPower}</td>
            <td>${fvp.toFixed(2)}%</td>
            <td>${finalIndependentCSR}%</td>
        </tr>`;
    }

    // Update pagination controls
    const paginationControls = document.getElementById("paginationControls");
    paginationControls.innerHTML = `
        <button onclick="previousPage()" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
        <span>Page ${currentPage} of ${Math.ceil(availableValidators.length / itemsPerPage)}</span>
        <button onclick="nextPage()" ${currentPage === Math.ceil(availableValidators.length / itemsPerPage) ? 'disabled' : ''}>Next</button>
    `;
}

function updateResultsTable() {
    const tableBody = document.querySelector(".simulation-table tbody");
    tableBody.innerHTML = "";

    const { csrResults, slashedNAMResults } = calculateCSR(validators);

    for (let validatorName in csrResults) {
        const csr = csrResults[validatorName];
        const slashedNAM = slashedNAMResults[validatorName];
        const epoch = validators[validatorName].epoch;
        const votingPower = validators[validatorName].votingPower;
        const infractions = validators[validatorName].infractions;

        tableBody.innerHTML += `<tr>
            <td>${validatorName}</td>
            <td>${epoch}</td>
            <td>${votingPower}</td>
            <td>${infractions}</td>
            <td>${csr}%</td>
            <td>${slashedNAM} NAM</td>
            <td><button onclick="removeValidator('${validatorName}')" class="btn">Remove</button></td>
        </tr>`;
    }
}

function calculateCSR(validators) {
    let csrResults = {};
    let slashedNAMResults = {};

    for (let name in validators) {
        const { epoch, infractions, votingPower } = validators[name];
        const fvp = votingPower / totalVotingPower;
        let iwwvftvp = fvp * infractions; // Fractional voting power * infractions

        for (let otherName in validators) {
            if (otherName === name) continue;
            const { epoch: otherEpoch, infractions: otherInfractions, votingPower: otherVotingPower } = validators[otherName];
            if (Math.abs(epoch - otherEpoch) <= 1) {
                const otherFvp = otherVotingPower / totalVotingPower;
                iwwvftvp += otherFvp * otherInfractions;
            }
        }

        // Calculate CSR
        const csr = 9 * (iwwvftvp ** 2) * 100;
        const finalCSR = Math.min(Math.max(csr, 1), 100).toFixed(2); // Ensure CSR is at least 1% and not more than 100%
        const slashedNAM = (finalCSR / 100) * votingPower;

        csrResults[name] = finalCSR;
        slashedNAMResults[name] = slashedNAM.toFixed(4);
    }

    return { csrResults, slashedNAMResults };
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        updateValidatorsTable();
    }
}

function nextPage() {
    if (currentPage < Math.ceil(availableValidators.length / itemsPerPage)) {
        currentPage++;
        updateValidatorsTable();
    }
}

function scrollToSimulationTool() {
    document.getElementById("simulationTool").scrollIntoView({ behavior: "smooth" });
}

// Ensure voting power is updated when a validator is selected
document.getElementById("validatorSelect").addEventListener("change", function() {
    syncVotingPower();
});

// Check if the user has scrolled to the bottom of the page
window.addEventListener("scroll", function() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !scrolledToBottom) {
        scrolledToBottom = true;
        document.getElementById("descriptionSection").style.display = "block";
    }
});

function updateRealTimeEpochInTable() {
    const tableBody = document.querySelector(".validator-table tbody");
    const rows = tableBody.getElementsByTagName("tr");

    for (let row of rows) {
        const cells = row.getElementsByTagName("td");
        cells[cells.length - 1].textContent = realTimeEpoch; // Update the last cell with realTimeEpoch
    }

    const resultsTableBody = document.querySelector(".simulation-table tbody");
    const resultsRows = resultsTableBody.getElementsByTagName("tr");

    for (let row of resultsRows) {
        const cells = row.getElementsByTagName("td");
        cells[1].textContent = realTimeEpoch; // Update the second cell with realTimeEpoch
    }
}

// Add a box to display the real-time epoch value
document.addEventListener("DOMContentLoaded", function() {

    // Insert the box above the validator list table
    const validatorListTable = document.querySelector(".validator-table");
    validatorListTable.parentNode.insertBefore(realTimeEpochBox, validatorListTable);

    // Insert the box in the CSR simulation tool section
    const simulationToolSection = document.getElementById("simulationTool");
    simulationToolSection.insertBefore(cloneNode(true), simulationToolSection.firstChild);
});
