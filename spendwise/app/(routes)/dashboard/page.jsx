"use client"
import React, { useEffect, useState } from 'react'
import { UserButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import CardsInfo from './_components/CardsInfo';
import { db } from '@/utils/dbConfig';
import { eq, getTableColumns, desc, sql } from 'drizzle-orm';
import { Expenses } from '@/utils/schema';
import { Budgets } from '@/utils/schema';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';

function Dashboard() {

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
    <div className='p-8'>
      <h2 className='font-bold text-3xl'>Hi, {user?.fullName} ✌️ </h2>
      <p className='text-gray-500'>Here's what happening with your money , lets manage your expense</p>

      <CardsInfo budgetList={budgetList} />
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='lg:col-span-2'>
          <BarChartDashboard
            budgetList={budgetList}
          />
        

        <ExpenseListTable 
          expensesList={expensesList}
          refreshData={()=>getBudgetList}
        />
      
</div>
        <div className='grid gap-5'>
        <h2 className='font-bold text-lg'>Latest Budgets</h2>
        {budgetList.length > 0 ? (
            budgetList.map((budget, index) => (
              <BudgetItem budget={budget} key={index} />
            ))
          ) : (
            <p>No budgets available</p>
          )}
        
          
         
         

        </div>
       

      </div>
    </div>
  )
}

export default Dashboard