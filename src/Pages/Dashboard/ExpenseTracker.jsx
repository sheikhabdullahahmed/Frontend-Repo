import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Layout/SideMenu";

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleAddIncome = (form, editingItem) => {
    if (editingItem) {
      setIncomes(incomes.map(inc => inc.id === editingItem.id ? { ...form, id: inc.id } : inc));
    } else {
      setIncomes([...incomes, { ...form, id: Date.now() }]);
    }
  };

  const handleAddExpense = (form, editingItem) => {
    if (editingItem) {
      setExpenses(expenses.map(exp => exp.id === editingItem.id ? { ...form, id: exp.id } : exp));
    } else {
      setExpenses([...expenses, { ...form, id: Date.now() }]);
    }
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const handleDeleteIncome = (id) => {
    setIncomes(incomes.filter(inc => inc.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 w-full">
        {/* Mobile Header with Hamburger */}
        <div className="lg:hidden bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-30">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Expense Tracker
          </h1>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Page Content */}
        <div className="w-full">
          <Outlet 
            context={{ 
              incomes, 
              expenses, 
              handleAddIncome, 
              handleAddExpense, 
              handleDeleteExpense, 
              handleDeleteIncome, 
              setExpenses, 
              setIncomes 
            }} 
          />
        </div>
      </div>
    </div>
  );
}