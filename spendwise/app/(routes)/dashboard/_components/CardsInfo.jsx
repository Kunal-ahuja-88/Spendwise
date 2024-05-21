import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect,useState } from 'react'

function CardsInfo({ budgetList }) {

    const[totalBudget,setTotalBudget]=useState(0);

    useEffect(()=> {
        budgetList&&CalculateCardInfo()
    },[budgetList])

    const CalculateCardInfo = ()=> {
        let _totalBudget=0
        let _totalSpend=0

        budgetList.forEach(element => {
            _totalBudget=_totalBudget+Number(element.amount)
            _totalSpend=_totalSpend+Number(element.totalSpend)
        });
    }


    return (
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                    <h2 className='text-sm'>Total Budget</h2>
                    <h2 className='font-bold text-2xl'>$1500</h2>
                </div>
             <PiggyBank className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>
            </div>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                    <h2 className='text-sm'>Total Spend</h2>
                    <h2 className='font-bold text-2xl'>$1500</h2>
                </div>
             <ReceiptText className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>
            </div>
            <div className='p-7 border rounded-lg flex items-center justify-between'>
                <div>
                    <h2 className='text-sm'>No. of budget</h2>
                    <h2 className='font-bold text-2xl'>$1500</h2>
                </div>
             <Wallet className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>
            </div>
        </div>
    )
}

export default CardsInfo