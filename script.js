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
