import './App.css';
import FormImport from './components/FormImport';
import EmailCard from './components/EmailCard';
import NavBar from './components/NavBar';
import { useState } from 'react';

function App() {
  const [emailInfos, setEmailInfos] = useState([])
  const [day, setDay] = useState('fri')

  return (
    <div className="App flex flex-col justify-center items-center" >
      <NavBar onToggle={setDay} />
      <div className='container max-w-max md:max-w-4xl mt-4'>
        <FormImport onComputed={setEmailInfos} day={day} />
        {
          emailInfos.length > 0 ? emailInfos.map((emailInfo) => {
            return <EmailCard emailInfo={emailInfo} day={day} />
          }) : null
        }
      </div>
    </div>
  );
}

export default App;