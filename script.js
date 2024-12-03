function getRiskPercentage(startingBalance, currentBalance, mode) {
  const profitPercentage = Math.max(
    ((currentBalance - startingBalance) / startingBalance) * 100,
    0
  );
  const drawdownPercentage = Math.max(
    ((startingBalance - currentBalance) / startingBalance) * 100,
    0
  );

  const baseRisk = {
    conservative: 0.5,
    normal: 1.0,
    aggressive: 2.0,
  };

  const baseRiskValue = baseRisk[mode.toLowerCase()] || 1.0;

  const riskPercentage =
    baseRiskValue *
    (1 +
      (profitPercentage - drawdownPercentage) *
        (0.1 * (1 + 3 * (profitPercentage / 10))));

  return Math.min(riskPercentage, 4); // Cap at 4% maximum
}

document
  .getElementById("riskCalculatorForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const startingBalance = parseFloat(
      document.getElementById("startingBalance").value
    );
    const currentBalance = parseFloat(
      document.getElementById("currentBalance").value
    );
    const mode = document.getElementById("mode").value;

    if (!startingBalance || !currentBalance) {
      alert("Please enter both starting and current balances.");
      return;
    }

    const riskPercentage = getRiskPercentage(
      startingBalance,
      currentBalance,
      mode
    );

    document.getElementById("riskPercentage").textContent =
      riskPercentage.toFixed(2);
    document.getElementById("results").style.display = "block";
  });

////////////////////////////////// Simulation code below
// Event listener for form submission
document
  .getElementById("simulatorForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input values
    const startingCapital = parseFloat(
      document.getElementById("startingCapital").value
    );
    const winRate = parseFloat(document.getElementById("winRate").value);
    const numTrades = parseInt(document.getElementById("numTrades").value);
    const riskMode = document.getElementById("riskMode").value;
    const riskReward = parseFloat(document.getElementById("riskReward").value);

    if (!startingCapital || !winRate || !numTrades || !riskReward) {
      alert("Please fill in all fields.");
      return;
    }

    // Get risk percentage based on risk mode
    const riskPercentage = getRiskPercentage(startingCapital, riskMode);

    // Run the simulation
    let finalCapital = startingCapital;
    let totalWins = 0;
    let totalLosses = 0;
    let totalProfit = 0;

    // Array to hold capital values at each trade for charting
    let capitalHistory = [startingCapital];

    for (let i = 0; i < numTrades; i++) {
      // Determine if the trade is a win or loss based on win rate
      const isWin = Math.random() * 100 < winRate;
      const riskAmount = startingCapital * (riskPercentage / 100); // Risk per trade based on starting capital
      const rewardAmount = riskAmount * riskReward; // Reward per trade based on risk/reward ratio

      if (isWin) {
        finalCapital += rewardAmount;
        totalWins++;
        totalProfit += rewardAmount;
      } else {
        finalCapital -= riskAmount;
        totalLosses++;
        totalProfit -= riskAmount;
      }

      // Track the capital after each trade
      capitalHistory.push(finalCapital);
    }

    // Display results
    document.getElementById("finalCapital").textContent =
      finalCapital.toFixed(2);
    document.getElementById("profit").textContent = totalProfit.toFixed(2);
    document.getElementById("totalWins").textContent = totalWins;
    document.getElementById("totalLosses").textContent = totalLosses;

    // Show the results section
    document.getElementById("results").style.display = "block";

    // Create the chart
    createChart(capitalHistory);
  });

// Function to calculate risk percentage based on risk mode
function getRiskPercentage(startingCapital, mode) {
  const baseRisk = {
    conservative: 0.5,
    normal: 1.0,
    aggressive: 2.0,
  };

  const baseRiskValue = baseRisk[mode.toLowerCase()] || 1.0;
  return baseRiskValue;
}

// Function to create the chart
function createChart(capitalHistory) {
  const ctx = document.getElementById("capitalChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: capitalHistory.map((_, index) => `Trade ${index + 1}`), // Create labels for each trade
      datasets: [
        {
          label: "Capital over Time",
          data: capitalHistory, // Use capital history data
          borderColor: "rgba(75, 192, 192, 1)",
          fill: false,
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}
