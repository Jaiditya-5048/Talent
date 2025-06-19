import DsrForm from '../components/DsrForm';

function AddDsr() {
  return (
    <>
      <div className='h-lvh w-lvw bg-split flex items-center justify-center '>
        <div className='w-[80%] h-[70%] mx-auto bg-white p-8 rounded-lg shadow-lg overflow-y-auto scroll-hidden'>
          <div>
            <p className='text-xl text-[#32325d] font-bold mb-4'>Add DSR</p>
          </div>
          <DsrForm />
        </div>
      </div>
    </>
  );
}

export default AddDsr;
