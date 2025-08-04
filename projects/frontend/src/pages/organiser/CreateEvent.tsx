import EventForm from '@/components/forms/EventForm'
import EventInstanceForm from '@/components/rough/original forms/eventForms/EventInstanceForm';
import React, { useState } from 'react'

function CreateEvent() {
  const [step, setStep] = useState<number>(1);

  return (
    <>
    <div className='p-5 flex flex-col '>
      <p className='text-4xl'>
        {step === 0 && 'Event Deatils'}
        {step === 1 && 'Add Instances'}
      </p>

      <div className='w-md mx-auto'>
        {step === 0 && <EventForm onSuccess={()=> setStep(1)} />}
            {step === 1 && (
          <>
            <EventInstanceForm  />

            {/* <div className="flex justify-end mt-4">
              <Button
                onClick={handleNextClick}
              >
                Finish
              </Button>
            </div> */}
          </>
        )}

        
       </div>
     
    </div>
      
    </>
  )
}

export default CreateEvent
