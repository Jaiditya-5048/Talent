

function Form() {
  return (
    <>
      <div className='w-[50vw]'>
        <form className='flex flex-col'>
          <label htmlFor='title'>Title</label>
          <input type='text' name='title' id='title' className='border-2 border-amber-50' />
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            name='description'
            id='description'
            className='border-2 border-amber-50'
          />
        </form>
      </div>
    </>
  );
}

export default Form
