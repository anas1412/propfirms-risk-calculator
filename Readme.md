# 📊 Prop Firm Risk Calculator

A modern, user-friendly calculator that helps prop traders optimize their position sizing based on the Kelly Criterion and compound growth principles.

## 🌟 Live Demo
Visit the calculator: [https://anas1412.github.io/propfirms-risk-calculator/](https://anas1412.github.io/propfirms-risk-calculator/)

## 📝 Description
This risk calculator helps traders determine optimal position sizes based on their current performance and risk tolerance. It implements a modified version of the Kelly Criterion that accounts for:
- Current profit/drawdown status
- Individual risk tolerance levels
- Compound growth principles
- Maximum risk constraints

## 🧮 The Formula
The calculator uses the following formula to determine risk percentage:

```python
risk_percentage = base_risk * (1 + (profit_percentage - drawdown_percentage) * (0.1 * (1 + 3 * (profit_percentage / 10))))
```

Where:
- `base_risk`: Determined by risk preference
  - Conservative: 0.5%
  - Normal: 1%
  - Aggressive: 2%
- `profit_percentage`: Current profit (if positive)
- `drawdown_percentage`: Current drawdown (if negative)
- Maximum risk is capped at 4%

## 🎯 Features
- Real-time risk calculations
- Three risk preference levels
- Responsive design for all devices
- Visual feedback and intuitive interface
- Educational content about risk management principles

## 💡 Theory Behind the Calculator

### Kelly Criterion
The Kelly Criterion is a formula used in risk management that helps determine the optimal size of a series of investments or trades. The basic principle suggests that the optimal percentage of your capital to risk is:

```
Kelly % = W - [(1-W)/R]
```
Where:
- W = Winning probability
- R = Win/Loss ratio

Our calculator modifies this based on actual trading performance rather than theoretical probabilities.

### Compound Effect
The calculator implements compound growth principles by:
1. Increasing risk gradually during profitable periods
2. Reducing risk during drawdowns
3. Using a progressive scaling factor based on performance

## 🛠️ Technologies Used
- HTML5
- Tailwind CSS
- Vanilla JavaScript
- No external dependencies required

## 📦 Installation
1. Clone the repository
```bash
git clone https://github.com/anas1412/risk-calculator.git
```

2. Open `index.html` in your browser

Or simply deploy to GitHub Pages.

## 🔧 Usage
1. Enter your current capital status (profit or drawdown percentage)
2. Select your risk preference (Conservative, Normal, or Aggressive)
3. View your calculated risk percentage
4. Optional: Click "Learn About the Method" to understand the underlying principles

## ⚠️ Risk Warning
This calculator is meant to be used as a guideline only. Always:
- Practice proper risk management
- Never risk more than you can afford to lose
- Consider your prop firm's specific rules and requirements
- Use this tool as part of a comprehensive trading strategy

## 🎓 Sources & Further Reading
- [Kelly Criterion - Wikipedia](https://en.wikipedia.org/wiki/Kelly_criterion)
- "Fortune's Formula" by William Poundstone
- "The Mathematics of Money Management" by Ralph Vince

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/anas1412/risk-calculator/issues).

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author
**anas1412**
- GitHub: [@anas1412](https://github.com/anas1412)
- Website: [anas1412.github.io](https://anas1412.github.io/)

## 🙏 Acknowledgments
- Kelly Criterion for the foundational mathematical principles
- Modern prop trading community for feedback and insights
- All contributors and testers

---
© 2024 anas1412. All rights reserved.
