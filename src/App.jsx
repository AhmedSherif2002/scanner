import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { scan } from './functions';

function App() {
  const [file,setFile] = useState(null);
  const [output,setOutput] = useState([]);

  const fileSelectHandle = (e)=>{
    console.log(e.target.files[0])
    setFile(e.target.files[0]);
  }
  const scanHandle = (e)=>{
    console.log(file)
    console.log("scanning");
    const tokens = scan(file.path);
    setOutput(tokens);
    console.log(tokens);
  }

  return (
    <>
      <div className='w-full m-auto py-12 flex flex-col items-center gap-8'>
        <div className='addFile w-1/3 m-auto flex flex-col'>
          <label htmlFor="file" className='bg-green-500 text-white text-2xl font-semibold rounded-lg text-center cursor-pointer py-10'>Choose File</label>
          <input type="file" name='file' id='file' className='hidden' onChange={fileSelectHandle}/>
          <span className={`text-center ${file === null?"hidden":"visible"}`}>Selected file: <span className='text-green-600'>{file?.name}</span></span>
        </div>
        <button className='font-bold bg-gray-200 w-fit text-green-700 hover:bg-gray-100 duration-500 text-xl px-4 py-2 rounded-md' onClick={scanHandle}>Submit</button>
        <div className='tokens-result w-1/3'>
          <div className='flex flex-row font-semibold bg-green-700 text-white'>
            <div className='w-1/2 p-2 '>Value</div>
            <div className='w-1/2 p-2 '>Type</div>
          </div>
          <div className='overflow-auto' style={{maxHeight:"400px"}}>
            {
              output.map(output=>(
                <>
                  <div className='flex flex-row font-semibold bg-gray-100 border-b-2'>
                    <div className='w-1/2 p-2 '>{output.value}</div>
                    <div className='w-1/2 p-2 '>{output.type}</div>
                  </div>
                </>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
