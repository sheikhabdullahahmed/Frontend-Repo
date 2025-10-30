import { useState, useEffect } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { FiDollarSign } from "react-icons/fi";
import axios from "axios";

function Dashboard() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [incomeRes, expenseRes] = await Promise.all([
        axios.get("http://localhost:4000/income", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:4000/expense", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setIncomes(incomeRes.data);
      setExpenses(expenseRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const totalIncome = incomes.reduce((sum, inc) => sum + parseFloat(inc.amount || 0), 0);
  const totalExpense = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
  const balance = totalIncome - totalExpense;

  const recentTransactions = [
    ...expenses.map((e) => ({ ...e, type: "expense" })),
    ...incomes.map((i) => ({ ...i, type: "income" })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">Dashboard</h2>
          <p className="text-sm sm:text-base text-gray-600">Welcome back! Here's your financial overview.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Income Card */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <p className="text-green-100 text-xs sm:text-sm font-medium mb-1">Total Income</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">${totalIncome.toFixed(2)}</p>
                <p className="text-green-100 text-xs sm:text-sm mt-1">{incomes.length} transactions</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-2 sm:p-3 lg:p-4">
                <AiOutlineArrowUp className="text-white" size={24} />
              </div>
            </div>
          </div>

          {/* Expense Card */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <p className="text-red-100 text-xs sm:text-sm font-medium mb-1">Total Expense</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">${totalExpense.toFixed(2)}</p>
                <p className="text-red-100 text-xs sm:text-sm mt-1">{expenses.length} transactions</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-2 sm:p-3 lg:p-4">
                <AiOutlineArrowDown className="text-white" size={24} />
              </div>
            </div>
          </div>

          {/* Balance Card */}
          <div className={`bg-gradient-to-br ${balance >= 0 ? 'from-purple-500 to-purple-600' : 'from-orange-500 to-orange-600'} rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 transform hover:scale-105 transition-transform duration-200 sm:col-span-2 lg:col-span-1`}>
            <div className="flex items-center justify-between">
              <div className="text-white">
                <p className="text-purple-100 text-xs sm:text-sm font-medium mb-1">Total Balance</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">${Math.abs(balance).toFixed(2)}</p>
                <p className="text-purple-100 text-xs sm:text-sm mt-1">{balance >= 0 ? 'Positive' : 'Negative'}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-2 sm:p-3 lg:p-4">
                <FiDollarSign className="text-white" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Recent Transactions</h3>
            <span className="text-xs sm:text-sm text-gray-500">Last 5 transactions</span>
          </div>

          {recentTransactions.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="bg-gray-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4">
                <FiDollarSign className="text-gray-400" size={32} />
              </div>
              <p className="text-gray-500 text-base sm:text-lg mb-2">No transactions yet</p>
              <p className="text-gray-400 text-sm">Add income or expenses to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-3 sm:p-5 bg-gradient-to-r from-gray-50 to-white rounded-lg sm:rounded-xl hover:shadow-md transition-shadow duration-200 border border-gray-100"
                >
                  <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 ${
                      item.type === "income"
                        ? "bg-gradient-to-br from-green-100 to-green-200"
                        : "bg-gradient-to-br from-red-100 to-red-200"
                    }`}>
                      {item.type === "income" ? (
                        <AiOutlineArrowUp className="text-green-600" size={20} />
                      ) : (
                        <AiOutlineArrowDown className="text-red-600" size={20} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg truncate">{item.title}</p>
                      <div className="flex items-center gap-1 sm:gap-2 mt-1 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 sm:py-1 rounded-full ${
                          item.type === "income"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {item.category || item.source}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500">{item.date.split('T')[0]}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-2 flex-shrink-0">
                    <p className={`text-base sm:text-xl lg:text-2xl font-bold ${
                      item.type === "income" ? "text-green-600" : "text-red-600"
                    }`}>
                      {item.type === "income" ? "+" : "-"}${parseFloat(item.amount).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;