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
  return Math.min(riskPercentage, 4);
}

function formatMoney(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatPercent(value) {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

let chart = null;

function updateChart(balanceHistory, initialBalance) {
  const ctx = document.getElementById("equityChart").getContext("2d");

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Array.from(
        { length: balanceHistory.length },
        (_, i) => `Day ${i}`
      ),
      datasets: [
        {
          label: "Account Balance",
          data: balanceHistory,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true,
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: (value) => formatMoney(value),
          },
        },
      },
    },
  });
}

function simulateTrading(initialBalance, rrRatio, winRate, totalDays, mode) {
  let balance = initialBalance;
  let winCount = 0;
  let lossCount = 0;
  const balanceHistory = [initialBalance];
  const tradeLog = document.getElementById("tradeLog");
  tradeLog.innerHTML = "";

  for (let day = 1; day <= totalDays; day++) {
    const riskPercentage = getRiskPercentage(initialBalance, balance, mode);
    const riskAmount = balance * (riskPercentage / 100);
    const tradeResult = Math.random() < winRate / 100;

    let profitLoss, percentageChange;
    if (tradeResult) {
      profitLoss = riskAmount * rrRatio;
      balance += profitLoss;
      winCount++;
      percentageChange = (profitLoss / initialBalance) * 100;
      const totalReturn = ((balance - initialBalance) / initialBalance) * 100;

      tradeLog.innerHTML += `
                <div class="trade win">
                    <div class="trade-day">Day ${day}</div>
                    <div class="trade-details">
                        <div class="trade-balance">Won ${formatMoney(
                          profitLoss
                        )} (${formatPercent(percentageChange)})</div>
                        <div class="trade-risk">Risk: ${formatPercent(
                          riskPercentage
                        )} | Return from Start: ${formatPercent(
        totalReturn
      )}</div>
                    </div>
                    <div class="trade-balance">${formatMoney(balance)}</div>
                </div>
            `;
    } else {
      profitLoss = -riskAmount;
      balance += profitLoss;
      lossCount++;
      percentageChange = (profitLoss / initialBalance) * 100;
      const totalReturn = ((balance - initialBalance) / initialBalance) * 100;

      tradeLog.innerHTML += `
                <div class="trade loss">
                    <div class="trade-day">Day ${day}</div>
                    <div class="trade-details">
                        <div class="trade-balance">Lost ${formatMoney(
                          -profitLoss
                        )} (${formatPercent(percentageChange)})</div>
                        <div class="trade-risk">Risk: ${formatPercent(
                          riskPercentage
                        )} | Return from Start: ${formatPercent(
        totalReturn
      )}</div>
                    </div>
                    <div class="trade-balance">${formatMoney(balance)}</div>
                </div>
            `;
    }

    balanceHistory.push(balance);
  }

  document.getElementById("results").style.display = "block";
  document.getElementById("finalBalance").textContent = formatMoney(balance);
  document.getElementById("profitLoss").textContent = formatPercent(
    ((balance - initialBalance) / initialBalance) * 100
  );
  document.getElementById("actualWinRate").textContent = formatPercent(
    (winCount / totalDays) * 100
  );
  document.getElementById("totalTrades").textContent = totalDays;

  updateChart(balanceHistory, initialBalance);

  return {
    finalBalance: balance,
    winCount,
    lossCount,
    balanceHistory,
  };
}

document
  .getElementById("simulationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const initialBalance = parseFloat(
      document.getElementById("initialBalance").value
    );
    const rrRatio = parseFloat(document.getElementById("rrRatio").value);
    const winRate = parseFloat(document.getElementById("winRate").value);
    const totalDays = parseInt(document.getElementById("totalDays").value);
    const mode = document.getElementById("mode").value;

    simulateTrading(initialBalance, rrRatio, winRate, totalDays, mode);
  });
