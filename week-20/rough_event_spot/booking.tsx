
function booking() {
  return (
    <>
    <div className='text-gray-600 mb-4'>
          <p className='font-medium mb-2'>Select Date:</p>
          <div className='flex flex-wrap gap-2'>
            {event.date.map((date, index) => (
              <label key={index} className='flex items-center gap-1 text-sm'>
                <input
                  type='radio'
                  name='event-date'
                  value={date}
                  checked={selectedDate === date}
                  onChange={() => setSelectedDate(date)}
                  className='accent-purple-600'
                />
                {date}
              </label>
            ))}
          </div>
        </div>      
    </>
  )
}

export default booking
