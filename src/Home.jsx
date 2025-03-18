import React, { useState, useEffect  } from 'react'
import { IncModal,ExpModal } from './Modals';
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaTv } from "react-icons/fa";
import { MdOutlineModeOfTravel } from "react-icons/md";
import { PieChart, Pie, YAxis, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip,   } from 'recharts';


const categoryIcons = {
  food: () => <IoFastFoodSharp size={40} color="orange" />,
  entertainment: () => <FaTv size={40} color="blue" />,
  travel: () => <MdOutlineModeOfTravel size={40} color="green" />,
};


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};




const  Home = () => {

  const [incomeOpen,setIncomeOpen]= useState(false);
  const [expenseOpen,setExpenseOpen] = useState(false);
  const [bal,setBalance] =useState(5000);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenseData(storedExpenses);
  }, []);


  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenseData));
  }, [expenseData]);


  const addExpense = (expense) => {
    setExpenseData((prev) => [...prev, expense]);
    setBalance((prevBalance) => prevBalance - expense.amount);
  };


  const editExpense = (index) => {
    const expenseToEdit = expenseData[index];
    console.log("Editing:", expenseToEdit);
    setExpenseOpen(true);
  };

  const deleteExpense = (index) => {
    const deletedExpense = expenseData[index];
    setBalance((prevBalance) => prevBalance + Number(deletedExpense.amount));
    setExpenseData(expenseData.filter((_, i) => i !== index));
  };


  const getCategoryData = () => {
    const categoryMap = {};
    expenseData.forEach((expense) => {
      if (categoryMap[expense.category]) {
        categoryMap[expense.category] += expense.amount;
      } else {
        categoryMap[expense.category] = expense.amount;
      }
    });

  return Object.keys(categoryMap).map((category) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1), 
    value: categoryMap[category],
  }));
};
const categoryData = getCategoryData();
   
  return (
    <>
    <div className='top-container'>
       <h1 style={{marginLeft:"10px"}}>Expense Tracker</h1>
       <div className='topContainer-contents' >
          <div className='cards'>
            <h2>Wallet Balance:₹ {bal}</h2>
            <button style={{ background: "linear-gradient(45deg, #b4e035 , green)" }}
            onClick={()=>setIncomeOpen(true)}
            >+ Add Income</button>
           
          </div>
          <div className='cards'>
            <h2>Expenses</h2>
            <button style={{ background: "linear-gradient(45deg, #fd958c, red)" }}
            onClick={()=>setExpenseOpen(true)}
            >+ Add Expense</button>
          </div>
          <div className='chart-container'>

          <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  data={getCategoryData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getCategoryData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="category-legend-container">
  <div className="category-item">
    <span className="category-label">Food</span>
    <div className="category-box" style={{ backgroundColor: "#FFBB28" }}></div>
  </div>
  <div className="category-item">
    <span className="category-label">Entertainment</span>
    <div className="category-box" style={{ backgroundColor: "#0088FE" }}></div>
  </div>
  <div className="category-item">
    <span className="category-label">Travel</span>
    <div className="category-box" style={{ backgroundColor: "#00C49F" }}></div>
  </div>
</div>



          </div>
       </div>
    </div>


    <div className='bottom-container'>
     
      <div className='bottomContainer-transactions'>
         <h2 style={{marginLeft:"10px" ,fontStyle:"italic"}}>Recent Transactions</h2>
         {expenseData.length > 0 ? (
    <ul className="transaction-list">
    {expenseData.map((expense, index) => (
      <li key={index} className="transaction-item">
        

        <div className="transaction-details" >
        <span className="icon">
        {categoryIcons[expense.category] ? categoryIcons[expense.category]() : <IoFastFoodSharp size={40} color="gray" />}
          
        </span>
          <div className='transactions-contents'>
          <span className="title">{expense.title}</span>
          <span className="date" style={{color:"grey"}}>{expense.date}</span>
          </div>
        </div>

        <div className='expenseButtons'>

        <span className="amount">₹{expense.amount}</span>
        <FaEdit className="icon edit" size={25} color="yellow" onClick={() => editExpense(index)} />
        <FaTrash className="icon delete" size={25} color="red" onClick={() => deleteExpense(index)} />
        </div>
      </li>
    ))}
  </ul>
  ) : (
    <div className="no-transactions" style={{marginLeft:"10px",backgroundColor:"white",width:"100%",height:"60px", color:"black",
      borderRadius:"10px", display:"flex", justifyContent:"center",alignItems:"center"
    }}>No transactions</div>
  )}

{expenseData.length > 0 && (
  <button
    className="floating-edit-btn"
    onClick={() => editExpense(expenseData.length - 1)}
  >
    <FaEdit size={25} color="white" />
  </button>
)}
        
       </div>

       <div className='bottomContainer-topExpenses'>
        <h2 style={{fontStyle:'italic', marginLeft:"75px"}}>Top Expenses</h2>
         <div className='chart-contents'>
         {expenseData.length > 0 ? (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={getCategoryData()} layout="vertical">
          <XAxis type="number" hide={true} />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={100} 
            tick={{ fill: "black", fontSize: 14 }} 
            axisLine={false} 
            tickLine={false} 
          />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    ) : (
      <div style={{ width: "100%", height: "200px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {["Food", "Entertainment", "Travel"].map((category) => (
          <div key={category} style={{ height: "33%", display: "flex", alignItems: "center", fontSize: "14px",  marginLeft:"10px" }}>
            {category}
          </div>
        ))}
      </div>
    )}
        </div>

       </div>

    </div>

    <IncModal open={incomeOpen} close={() => setIncomeOpen(false)} bal={bal} setBalance={setBalance} />
    <ExpModal
  openE={expenseOpen}
  closeE={() => setExpenseOpen(false)}
  bal={bal}
  setBalance={setBalance}
  addExpense={addExpense}  
/>
    </>
  )
}
export default Home
