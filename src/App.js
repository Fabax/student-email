import './App.css';
import FormImport from './components/FormImport';
import { useState } from 'react';

function App() {
  const [emailInfos, setEmailInfos] = useState([])

  const getBody = (emailInfo) => {

    let bodyTop = `Beste ${emailInfo.teacher.join(" / ")},
    %0A
    %0AHierbij de lijst met absenties van deze week.
    %0A%0A`

    let bodyMiddle = emailInfo.students.map((student) => {
      return `- ${student.name} : ${student.hours}uur`
    }).join('%0A')

    let bodyBottom = `%0A
    %0AGraag checken en waar nodig terugkoppelen aan mij, TL of admin.
    %0A
    %0ADank    
    `
    return (bodyTop + bodyMiddle + bodyBottom)
  }

  const getSubject = (emailInfo) => {
    let currentdate = new Date();
    var oneJan = new Date(currentdate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    var weekNumber = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);

    let subject = `Verzuim week ${weekNumber} - klas ${emailInfo.klas}`
    return subject
  }

  return (
    <div className="App">
      <FormImport onComputed={setEmailInfos} />
      {
        emailInfos.length > 0 ? emailInfos.map((emailInfo) => {
          return (
            <div key={emailInfo.klas.toString()}>
              <br />
              <h2>{emailInfo.klas}</h2>
              <div>
              </div>
              <ul>
                {
                  emailInfo.students.map((student) => {
                    return (
                      <li key={JSON.stringify(student)} >{student.name} :  {student.hours}h</li>
                    )
                  })
                }
              </ul>
              <a href={`mailto:${emailInfo.email.toString()}?subject=${getSubject(emailInfo)}&body=${getBody(emailInfo)}`}>Click to Send an Email</a>
            </div>
          )
        }) : null
      }
    </div>
  );
}

export default App;