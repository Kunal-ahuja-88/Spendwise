"use client"
import React , { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable'
import { eq, getTableColumns, desc, sql } from 'drizzle-orm';
import { Expenses } from '@/utils/schema';
import { Budgets } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/dbConfig';

function page() {

    const { user } = useUser()

    const [budgetList, setBudgetList] = useState([]);
    const [expensesList,setExpensesList]=useState([]);

    useEffect(() => {
        user && getBudgetList();
      }, [user])
    
      /**
       * get budget list
       */
    
      const getBudgetList = async () => {
        const result = await db.select({
          ...getTableColumns(Budgets),
          totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`count(${Expenses.id})`.mapWith(Number)
        }).from(Budgets)
          .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
          .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
          .groupBy(Budgets.id)
          .orderBy(desc(Budgets.id))
    
        setBudgetList(result);
        getAllExpenses();
      }
    
      /**
       * used to get all expenses that belong to user
       */
      const getAllExpenses=async() => {
        const result = await db.select({
          id:Expenses.id,
          name:Expenses.name,
          amount:Expenses.amount,
          createdAt:Expenses.createdAt
        }).from(Budgets)
        .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
        .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
        .orderBy(desc(Expenses.id));
        setExpensesList(result);
      }

  return (
    <div className='p-7'>
   <h2 className=' font-bold text-3xl'>My Expense</h2>

   <ExpenseListTable 
          expensesList={expensesList}
          refreshData={()=>getBudgetList}
        />
    </div>
  )
}

export default page