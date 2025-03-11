import React, { useState } from 'react'

export const Counter = () => {

    const [count,setCount]= useState(0);
  return (
    <>
     <div style={{margin:"50px", display:"flex", gap:"10px", flexDirection:"column"}}>
     <h1>Counter App</h1>
     {<p>Count: {count}</p>}
     <div style={{ width:"400px" , display:'flex', flexWrap:"wrap"}}>

     <button style={{width:"100px"}} 
     onClick={()=>setCount(count+1)}
     >Increment</button>
     <button style={{width:"100px"}}
     onClick={()=>setCount(count-1)}
     >Decrement</button>

     </div>
     
     </div>

    </>
  )
}
