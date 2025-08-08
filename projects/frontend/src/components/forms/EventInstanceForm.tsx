import React from 'react'
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
  date: Yup.string().required('Date is required'),
  time: Yup.string().required('Time is required'),
  venue_id: Yup.string().required('Venue is required'),
  artist_ids: Yup.array()
    .of(Yup.string().required('Artist is required'))
    .min(1, 'At least one artist is required'),
  tickets: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('Ticket name is required'),
        price: Yup.number().positive('Price must be positive').required(),
        total_seats: Yup.number().min(1, 'Minimum 1 seat required').required(),
      })
    )
    .min(1, 'At least one ticket type is required'),
});

interface Ticket {
  name: string;
  price: number | string;
  total_seats: number | string;
}

export interface FormValues {
  date: string;
  time: string;
  venue_id: string;
  artist_ids: string[];
  tickets: Ticket[];
  editingInstanceId?: number | null;
}

  const initialValues: FormValues = {
    date: '',
    time: '',
    venue_id: '',
    artist_ids: [],
    tickets: [{ name: '', price: '', total_seats: '' }],
    editingInstanceId: null,
  };

function EventInstanceForm() {
  return (
    <>

    </>
  )
}

export default EventInstanceForm
