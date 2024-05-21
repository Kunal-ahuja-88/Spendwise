"use client"
import React , {useEffect,useState} from 'react'
import { UserButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import CardsInfo from './_components/CardsInfo';
import { db } from '@/utils/dbConfig';
import { eq , getTableColumns , desc , sql} from 'drizzle-orm';
import { Expenses } from '@/utils/schema';
import { Budgets } from '@/utils/schema';

function Dashboard() {

  const {user}=useUser()

  const [budgetList, setBudgetList] = useState([]);
  

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
  }
  return (
    <div className='p-5'>
    <h2 className='font-bold text-3xl'>Hi, {user?.fullName} ✌️ </h2>
    <p className='text-gray-500'>Here's what happening with your money , lets manage your expense</p>
    <CardsInfo budgetList={budgetList}/>
    </div>
  )
}

export default Dashboard