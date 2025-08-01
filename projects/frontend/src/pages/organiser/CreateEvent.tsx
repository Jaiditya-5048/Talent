import { createEvent } from '@/apis/services/organiser_apis/event_api';
import CreateEventForm from '@/components/eventForms/createEventForm';
import EventInstanceForm, { EventInstanceFormRef, FormValues } from '@/components/eventForms/EventInstanceForm';
import { Button } from '@/components/ui/button';
import { useEventForm } from '@/context/EventFormContext';
import React, { useRef, useState } from 'react'

function CreateEvent() {
  const { setEvent } = useEventForm();
  const [step, setStep] = useState<number>(1);
  const formRef = useRef<EventInstanceFormRef>(null); // <--- ref to child form
  const handleCreateEvent = async (values: {
    name: string;
    description: string;
    category_id: number;
  }) => {
    try {
      console.log(values);
      const response = await createEvent(values);
      console.log('Event created:', response);
      setEvent(response);
      setStep(1);
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  // 🔹 Your Next button handler
  const handleNextClick = () => {
    formRef.current?.resetFormState();
    setStep(0)
  };

  return (
    <>
      <div className="max-w-3xl mx-auto py-10 space-y-6">
        {step === 0 && <CreateEventForm onSubmit={handleCreateEvent} />}
        {step === 1 && (
          <>
            <EventInstanceForm ref={formRef} />

            <div className="flex justify-end mt-4">
              <Button
                onClick={handleNextClick}
              >
                Finish
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CreateEvent
