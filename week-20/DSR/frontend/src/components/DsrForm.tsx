import { useState } from 'react';
import DsrTaskForm from './DsrTaskForm';

const impEmployees = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
];

const allEmployees = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
  { id: 4, name: 'Bob Brown' },
  { id: 5, name: 'Charlie Davis' },
];

function DsrForm() {
  const [fileCount, setFileCount] = useState(0);
  const [toggleAddCC, setToggleAddCC] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFileCount(e.target.files.length);
  };

  const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escapes regex chars

  const filteredEmployees = allEmployees.filter((employee) => {
    try {
      const regex = new RegExp(escapeRegex(searchTerm), 'i');
      return regex.test(employee.name);
    } catch (error) {
      console.error('Invalid regex:', error);
      return false; 
    }
  });


  return (
    <>
      <form className=''>
        <DsrTaskForm />

        {/* attachments div */}
        <div className='flex flex-col mt-15 mb-10'> 
          <div className='max-w-md flex gap-3'>
            <p>Attachments:</p>
            {/* Hidden file input */}
            <input
              type='file'
              id='attachments'
              name='attachments'
              accept='.jpg, .jpeg, .png, .doc, .docx, .pdf, .xlsx, .csv'
              multiple
              onChange={handleChange}
              className='hidden'
            />

            {/* Custom upload button */}
            <label
              htmlFor='attachments'
              className=' cursor-pointer inline-block border border-gray-400 px-2 rounded text-white bg-[#05b2c5] hover:text-black'
            >
              Choose Files
            </label>

            {/* Show file count */}
            <div className='text-gray-700'>
              {fileCount > 0 ? (
                <p>
                  {fileCount} file{fileCount > 1 ? 's' : ''} selected
                </p>
              ) : (
                <p className='text-gray-400'>No files selected</p>
              )}
            </div>
          </div>
          <p className='text-sm text-gray-500 mt-2'>
            <span className='text-gray-600 font-bold'>*Note:</span> Only .jpg, .jpeg, .png, .doc,
            .docx, .pdf, .xlsx and .csv formats are allowed.
          </p>
        </div>

        {/* send to div */}
        <div className='mb-10'>
          <p>Send to:</p>
          <div className='flex flex-wrap gap-3 mt-2'>
            {impEmployees.map((employee) => (
              <div key={employee.id} className='flex items-center gap-2 bg-gray-100 p-2 rounded-md'>
                <input
                  type='checkbox'
                  id={`employee-${employee.id}`}
                  name='sendTo'
                  value={employee.name}
                  className='cursor-pointer'
                />
                <label htmlFor={`employee-${employee.id}`} className='cursor-pointer'>
                  {employee.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* cc to employees */}
        <div>
          <div className='flex items-center mb-2 gap-3'>
            <p className=''>Add Cc:</p>
            <input
              type='button'
              value='Add CC'
              onClick={() => setToggleAddCC(!toggleAddCC)}
              className='border border-gray-400 px-2 rounded text-white bg-[#05b2c5] hover:text-black cursor-pointer'
            />
          </div>
        </div>
        {toggleAddCC && (
          <div className='mt-5'>
            <input
              type='text'
              placeholder='Search employees...'
              className=' border p-2 rounded mb-4'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='flex flex-wrap gap-3 mt-2'>
              {filteredEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className='flex items-center gap-2 bg-gray-100 p-2 rounded-md'
                >
                  <input
                    type='checkbox'
                    id={`cc-${employee.id}`}
                    name='ccTo'
                    value={employee.name}
                    className='cursor-pointer'
                  />
                  <label htmlFor={`cc-${employee.id}`} className='cursor-pointer'>
                    {employee.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default DsrForm;
