import { useState, useEffect } from "react";
import FileImport from "./FileImport";
import { cleanCell } from "../helpers/helpers";

export default function FormImport({ onComputed, day }) {
    const [previousStudentList, setPreviousStudentList] = useState([])
    const [studentList, setStudentList] = useState([])
    const [classList, setClassList] = useState([])
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        if (studentList.length > 0 && classList.length > 0) {
            setShowButton(true)
        }
    }, [studentList, classList])


    const computeFiles = () => {
        let response = [];
        classList.forEach(entry => {
            let emails = entry.email.split(',').map(cleanCell)
            let teachers = entry.mentor.split(',').map(cleanCell)

            let klaasResponse = {
                klas: entry.klas,
                teacher: teachers,
                email: emails,
                lead: entry.lead,
                students: []
            }

            studentList.forEach(student => {
                if (student.klas === entry.klas) {

                    let isAbsentPreviousWeek = false

                    if (previousStudentList.length > 0) {
                        previousStudentList.forEach(studentPastWeek => {
                            if (studentPastWeek.voornaam === student.voornaam && studentPastWeek.achternaam === student.achternaam) {
                                isAbsentPreviousWeek = true
                            }
                        });
                    }

                    klaasResponse.students.push({
                        name: student.voornaam,
                        lastName: student.achternaam,
                        absent: student.a,
                        late: student.l,
                        absentBefore: isAbsentPreviousWeek
                    })
                }
            });

            if (klaasResponse.students.length > 0) {
                response.push(klaasResponse)
            }
        });

        onComputed(response)
    }

    return (
        <div className="flex flex-col mb-6">
            <div className="mb-4 flex flex-row justify-center">
                {
                    day === 'fri' ? <FileImport title="Previous week" listType="students" optional={true} onImported={setPreviousStudentList} /> : null
                }
                <FileImport title="Student list" listType="students" optional={false} onImported={setStudentList} />
                <FileImport title="Teacher list" listType="teachers" optional={false} onImported={setClassList} />
            </div>
            {
                showButton ?
                    <button className="btn btn-sm btn-secondary text-secondary-content" onClick={computeFiles}>Save some time</button> :
                    <button className="btn btn-sm btn-ghost text-secondary-content" disabled={true}>Save some time</button>
            }
        </div>
    )
}