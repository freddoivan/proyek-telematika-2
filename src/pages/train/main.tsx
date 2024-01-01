import withAuth from '@/components/hoc/withAuth'
import { TrainerLayout } from '@/components/trainer/TrainerLayout'
import React from 'react'


export default  withAuth(Main,'admin')
function Main(){
    return(
       <TrainerLayout>
            <p>
                asasa
            </p>
        </TrainerLayout>
    )
}