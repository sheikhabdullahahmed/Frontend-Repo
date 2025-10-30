import { useState, useEffect } from "react";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { AiOutlineArrowUp } from "react-icons/ai";
import axios from "axios";

function IncomePage() {
  const [incomes, setIncomes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    amount: '',
    source: 'Salary',
    date: new Date().toISOString().split('T')[0]
  });

  const sources = ['Salary', 'Business', 'Freelance', 'Investment', 'Other'];
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      const res = await axios.get("http://localhost:4000/income", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncomes(res.data);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  const handleAddIncome = async (formData) => {
    try {
      await axios.post("http://localhost:4000/income", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchIncomes();
      setForm({ title: '', amount: '', source: 'Salary', date: new Date().toISOString().split('T')[0] });
      setShowForm(false);
    } catch (error) {
      console.error("Error saving income:", error);
    }
  };

  const handleDeleteIncome = async (id) => {
    if (!window.confirm("Are you sure you want to delete this income?")) return;
    
    try {
      await axios.delete(`http://localhost:4000/income/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncomes(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  const handleSubmit = () => {
    if (form.title && form.amount) {
      handleAddIncome(form);
    }
  };

  const totalIncome = incomes.reduce((sum, inc) => sum + parseFloat(inc.amount || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Stats */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">Income</h2>
              <p className="text-sm sm:text-base text-gray-600">Track and manage your income sources</p>
            </div>
            <button
              onClick={() => {
                setShowForm(!showForm);
                if (showForm) {
                  setForm({ title: '', amount: '', source: 'Salary', date: new Date().toISOString().split('T')[0] });
                }
              }}
              className="flex items-center justify-center sm:justify-start bg-gradient-to-r from-green-600 to-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
            >
              <FiPlusCircle className="mr-2" size={18} />
              {showForm ? "Cancel" : "Add Income"}
            </button>
          </div>

          {/* Total Income Card */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <p className="text-green-100 text-xs sm:text-sm font-medium mb-1">Total Income</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">${totalIncome.toFixed(2)}</p>
                <p className="text-green-100 text-xs sm:text-sm mt-1">{incomes.length} income sources</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-2 sm:p-3 lg:p-4">
                <AiOutlineArrowUp className="text-white" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-gray-100">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Add New Income</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Income Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base"
              />
              <input
                type="number"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base"
              />
              <select
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
                className="border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base"
              >
                {sources.map(src => <option key={src} value={src}>{src}</option>)}
              </select>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="border border-gray-300 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
              >
                Add Income
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setForm({ title: '', amount: '', source: 'Salary', date: new Date().toISOString().split('T')[0] });
                }}
                className="bg-gray-200 text-gray-700 px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-gray-300 transition-all duration-200 text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Income List */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
          {incomes.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="bg-green-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4">
                <AiOutlineArrowUp className="text-green-600" size={32} />
              </div>
              <p className="text-gray-500 text-base sm:text-lg mb-2">No income records yet</p>
              <p className="text-gray-400 text-sm">Click "Add Income" to get started!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {incomes.map(income => (
                <div
                  key={income._id}
                  className="p-3 sm:p-4 lg:p-6 flex items-center justify-between hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent transition-colors duration-200"
                >
                  <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <AiOutlineArrowUp className="text-green-600" size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg truncate">{income.title}</p>
                      <div className="flex items-center gap-1 sm:gap-2 mt-1 flex-wrap">
                        <span className="text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-green-100 text-green-700 font-medium">
                          {income.source}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500">{income.date.split('T')[0]}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 ml-2 flex-shrink-0">
                    <p className="text-base sm:text-xl lg:text-2xl font-bold text-green-600">
                      +${parseFloat(income.amount).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleDeleteIncome(income._id)}
                      className="text-red-600 hover:text-red-800 p-1 sm:p-2 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
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

export default IncomePage;