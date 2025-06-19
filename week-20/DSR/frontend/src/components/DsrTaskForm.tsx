import { useState } from "react";
import type { DsrTaskFormData } from "../utils/type";

const projects = [
  { id: 1, name: 'Project A' },
  { id: 2, name: 'Project B' },
  { id: 3, name: 'Project C' },
  { id: 0, name: 'Other' },
];

function DsrForm() {
  const [DsrData, setDsrData] = useState<DsrTaskFormData>({
    projectId: 0,
    description: '',
    startTime: 0,
    endTime: 0,
  });

  console.log('DsrData:', DsrData);
  

  return (
    <>
      <div>
        <div className='text-sm border-y-1 border-gray-400 p-4 mb-6 flex gap-5 overflow-x-hidden'>
          {/* project dropdown */}
          <div className='w-[12%]'>
            <select
              name='projectName'
              id='projectName'    
              onChange={(e) => setDsrData({ ...DsrData, projectId: e.target.value })}
              required
              className='w-full border-1 h-10 border-gray-400 rounded-sm p-1 text-gray-400 outline-0 focus:border-blue-600 cursor-pointer'
            >
              <option value='' disabled selected hidden>
                Select Project
              </option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
          {/* descpription */}
          <textarea
            name='description'
            id='description'
            placeholder='Enter description'
            onChange={(e) => setDsrData({ ...DsrData, description: e.target.value })}
            required
            className='w-[50%] h-10 border-1 p-2 border-gray-400 rounded-sm text-gray-400 outline-0 focus:border-blue-600 cursor-text'
          ></textarea>
          {/* time stamps */}
          <div className='flex gap-5'>
            <input
              type='time'
              name='startTime'
              id='startTime'
              onChange={(e) => setDsrData({ ...DsrData, startTime: e.target.valueAsNumber })}
              required
              className='border-1 h-10 border-gray-400 rounded-sm p-2 text-gray-400 outline-0 focus:border-blue-600 cursor-text'
            />
            <input
              type='time'
              name='endTime'
              id='endTime'
              onChange={(e) => setDsrData({ ...DsrData, endTime: e.target.valueAsNumber })}
              required
              className='border-1 h-10 border-gray-400 rounded-sm p-2 text-gray-400 outline-0 focus:border-blue-600 cursor-text'
            />
          </div>
          {/* submit button */}
          <input
            type='submit'
            value='Submit'
            className='w-[10%] border-1 h-10 border-gray-400 rounded-sm p-2 outline-0 bg-[#05b2c5] text-white cursor-pointer hover:text-black transition-colors duration-300'
          />
        </div>
      </div>
    </>
  );
}

export default DsrForm;
