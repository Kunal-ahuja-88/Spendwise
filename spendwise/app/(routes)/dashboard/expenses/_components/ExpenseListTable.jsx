import { Trash } from 'lucide-react'
import React from 'react'
import { Expenses } from '@/utils/schema'
import { db } from '@/utils/dbConfig'
import { toast } from 'sonner'
import { eq } from 'drizzle-orm'

function ExpenseListTable({expensesList ,refreshData}) {

    const deleteExpense=async(expense)=> {
        const result = await db.delete(Expenses)
            .where(eq(Expenses.id,expense.id))
            .returning();

            if(result) {
                refreshData()
                toast('Expense Deleted')
            }
        
    }

  return (
    <div className='mt-4'>
    <div className='grid grid-cols-4 bg-slate-200 p-2'>
         <h2 className='font-bold'>Name</h2>
         <h2 className='font-bold'>Amount</h2>
         <h2 className='font-bold'>Date</h2>
         <h2 className='font-bold'>Action</h2>
    </div>
    {expensesList.map((expenses,index)=>{
        return (
          <div key={index} className='grid grid-cols-4 bg-slate-50 p-2'>
            <h2>{expenses.name}</h2>
            <h2>{expenses.amount}</h2>
            <h2>{expenses.createdAt}</h2>
            <h2><Trash className='text-red-600 cursor-pointer'
            onClick={()=>deleteExpense(expenses)}
             /></h2>
          </div>
        );
    })}
    </div>
  )
}

export default ExpenseListTable