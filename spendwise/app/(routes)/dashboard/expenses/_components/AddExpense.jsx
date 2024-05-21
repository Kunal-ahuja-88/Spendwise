import React from 'react'
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Budgets, Expenses } from '@/utils/schema';
import { db } from '@/utils/dbConfig';
import { toast } from 'sonner';
import moment from 'moment';

function AddExpense({ budgetId, user, refreshData }) {

    const [name, setName] = useState();
    const [amount, setAmount] = useState();



    const addNewExpense = async () => {
        const result = await db.insert(Expenses).values({
            name: name,
            amount: amount,
            budgetId: budgetId,
            createdAt:moment().format('DD/MM/yyy')
        }).returning({ insertedId: Budgets.id });

        if (result) {
            refreshData()
            toast('New expense added')
        }
    }

    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Add Expense</h2>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Name</h2>
                <Input
                    placeholder="e.g Electricity bill"
                    onChange={(e) => setName(e.target.value)}
                    className='text-gray-700' />

            </div>

            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Amount</h2>
                <Input
                    placeholder="e.g 1000"
                    onChange={(e) => setAmount(e.target.value)}
                    className='text-gray-700' />

            </div>
            <Button diasable={!(name && amount)}
                onClick={(e) => addNewExpense(e.target.value)}
                className='mt-3 w-full'>Add New Expense</Button>
        </div>
    )
}

export default AddExpense