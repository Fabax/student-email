import { useState, useEffect } from "react";
import FileImport from "./FileImport";

export default function FormImport({ onComputed }) {
    const [studentList, setStudentList] = useState([])
    const [classList, setClassList] = useState([])

    useEffect(() => {
        if (studentList.length > 0 && classList.length > 0) {
            let response = [];
            classList.forEach(entry => {
                let emails = entry.email.split(',').map((val) => {
                    return val.replace(/(\r\n|\n|\r)/gm, "").trim()
                })

                let teachers = entry.mentor.split(',').map((val) => {
                    return val.replace(/(\r\n|\n|\r)/gm, "").trim()
                })

                let klaasResponse = {
                    klas: entry.klas,
                    teacher: teachers,
                    email: emails,
                    students: []
                }

                studentList.forEach(student => {
                    if (student.klas === entry.klas) {
                        klaasResponse.students.push({
                            name: student.naam,
                            hours: student.uur
                        })
                    }
                });

                if (klaasResponse.students.length > 0) {
                    response.push(klaasResponse)
                }
            });

            onComputed(response)
        }

    }, [studentList, classList])

    return (
        <div>
            <FileImport title="students" onImported={setStudentList} />
            <FileImport title="class" onImported={setClassList} />
        </div>
    )
}