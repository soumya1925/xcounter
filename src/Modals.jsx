import { useState,useEffect } from "react";
export  const IncModal=({ open, close, children,bal, setBalance })=>{

    const [income, setIncome] = useState(localStorage.getItem("income") || "");

    useEffect(() => {
        localStorage.setItem("income", income);
      }, [income]); 
     const handleAddIncome =(e)=>{
        e.preventDefault();
        const incomeAmount = parseFloat(income);
        if(!isNaN(incomeAmount)&& incomeAmount>0){
            setBalance(bal+incomeAmount);
            localStorage.removeItem("income");
            setIncome("");
            close();
        }else{
            alert('Enter a valid a Amount')
        }

     }
    if(!open) return null;

    

    return(
        <div className="inc-modal-overlay">
      <div className="inc-modal">
        <h2>Add Balance</h2>
        <div className="modal-contents">
        <form onSubmit={handleAddIncome}>
        <input  className="incInp"
         type="number"
         placeholder="Income Amount"
         value={income}
         onChange={(e) => setIncome(e.target.value)}
         />
        <button className="bal" type="submit">Add Balance</button>
        <button  className="canc" onClick={close}>Cancel</button>
        </form>
        </div>
        {children} 
        
      </div>
    </div>
    )
}

export const ExpModal = ({ openE, closeE, bal, setBalance, addExpense, })=>{

 

  const [expenseData, setExpenseData] = useState(() => {
    return JSON.parse(localStorage.getItem("expenseData")) || {
      title: "",
      price: "",
      category: "",
      date: "",
    };
  });
  
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    return storedExpenses;
  }); 

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);


useEffect(() => {
  console.log("Current Local Storage Data:", localStorage.getItem("expenses"));
  

}, []);


 

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleAddExpense = (e) => {
    e.preventDefault();
    const { title, price, category, date } = expenseData;
    const expenseAmount = parseFloat(price); // Ensure price is a number


    if (title && !isNaN(expenseAmount) && expenseAmount > 0 && category && date) {
        if (expenseAmount > bal) {
            alert("Insufficient balance! You cannot spend more than your wallet balance.");
            return;
        }

        const newExpense = { title, amount: expenseAmount, category, date };

        addExpense(newExpense); 



        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

        setExpenseData({
            title: "",
            price: "",
            category: "",
            date: "",
        });

        closeE();
    } else {
        alert("Please enter valid expense details");
    }
};



  if (!openE) return null;


    return(
        <div className="inc-modal-overlay">
      <div className="inc-modal">
        <h2 style={{marginLeft:"30px"}}>Add Expenses </h2>
        <div className="modalExpense">
        <form onSubmit={handleAddExpense}>
        <input  className="expenseInp"
         type="text"
         name="title"
         placeholder="Title"
         value={expenseData.title}
              onChange={handleInputChange}
         />
         <input className="expenseInp"
         type="number"
         name="price"
         placeholder="Price"
         value={expenseData.price}
         onChange={handleInputChange}
         />

<select className="expenseInp" name="category"  value={expenseData.category}   onChange={handleInputChange}>
  <option value="" disabled selected>Category</option>
  <option value="food">Food</option>
  <option value="entertainment">Entertainment</option>
  <option value="travel">Travel</option>
</select>

        <input className="expenseInp"
        name="date"
         type="date"
         placeholder="dd/mm/yy"
         value={expenseData.date}
         onChange={handleInputChange}
         />

        <button className="bal" type="submit">+ Add Expense</button>
        <button  className="canc" onClick={closeE}>Cancel</button>

        </form>
        </div>
       
      </div>
    </div>
    )
}


