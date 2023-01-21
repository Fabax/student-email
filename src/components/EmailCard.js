import { useState } from "react";
import { getWeekDate, capitalize } from "./../helpers/helpers"


export default function EmailCard({ emailInfo, day }) {
    const [isSent, setIsSent] = useState(false)

    const getBody = (emailInfo) => {

        let bodyTop = `Beste ${emailInfo.teacher.map((v) => { return capitalize(v) }).join(" en ")},`

        let line1 = day === "wed" ?
            `Bij deze stuur ik je de lijst met absenties en te laat meldingen tot nu toe.` :
            `Bij deze stuur ik je de lijst met absenties en te laat meldingen van de volledige week.`

        // absent ============
        let absentArray = emailInfo.students.filter((student) => { return student.absent > 0 ? true : false; })
        let absentMessage = getListMessage(absentArray, 'Absent')

        // late ==========
        let lateArray = emailInfo.students.filter((student) => { return student.late > 0 ? true : false; })
        let lateMessage = getListMessage(lateArray, 'Te laat')
        // =====

        let bodyBottom = day === 'wed' ?
            `Graag de check waarom en waar nodig een terugkoppeling naar admin, TL of mij.%0ADank!` :
            `Bij nieuwe gegevens, of bijzonderheden, graag een check waarom en waar nodig een terugkoppeling naar admin, TL of mij.%0ADank! `


        let final = [bodyTop, line1]
        if (absentMessage !== '') { final.push(absentMessage) }
        if (lateMessage !== '') { final.push(lateMessage) }
        final.push(bodyBottom)

        return final.join('%0A%0A')
    }

    const getListMessage = (array, title) => {

        let list = array.map((student) => {
            let absentBefore = title === 'Absent' && student.absentBefore ? ', had ook verzuim vorige week.' : '.'
            return `- ${capitalize(student.name)} ${capitalize(student.lastName)} : ${title === 'Absent' ? student.absent : student.late} uur${absentBefore}`
        }).join('%0A')

        let message = array.length > 0 ? `${title}:%0A${list}` : '';
        return message
    }

    const getSubject = (emailInfo) => {
        var weekNumber = getWeekDate()
        let wedSubject = `Verzuim week ${weekNumber} eerste helft - klas ${emailInfo.klas.toUpperCase()}`;
        let friSubject = `Verzuim week ${weekNumber} totaal - klas ${emailInfo.klas.toUpperCase()}`

        return day === "wed" ? wedSubject : friSubject
    }

    const onSent = () => {
        setIsSent(true)
    }

    const setCellColor = (isSent, absentBefore) => {
        let classList = ''
        if (absentBefore) {
            classList = "bg-orange-300"
        } else {
            if (isSent) {
                classList = "bg-emerald-300"
            }
        }

        return classList
    }

    return (
        <div className={isSent ? 'card w-full bg-emerald-300 shadow-xl mb-4' : 'card w-full bg-base-100 shadow-xl mb-4'} key={emailInfo.klas.toString()}>
            <div className="card-body">
                <h2 className="card-title">{emailInfo.klas.toString().toUpperCase()}</h2>
                <table className="table table-compact w-full ">
                    <thead >
                        <tr>
                            <th className={isSent ? "bg-emerald-500 text-white" : null}>Voornaam</th>
                            <th className={isSent ? "bg-emerald-500 text-white" : null}>achternaam</th>
                            <th className={isSent ? "bg-emerald-500 text-white" : null}>Absent</th>
                            <th className={isSent ? "bg-emerald-500 text-white" : null}>Te laat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            emailInfo.students.map((student) => {
                                return (
                                    <tr key={JSON.stringify(student)} >
                                        <td className={setCellColor(isSent, student.absentBefore)}>{capitalize(student.name)}</td>
                                        <td className={setCellColor(isSent, student.absentBefore)}>{capitalize(student.lastName)}</td>
                                        <td className={setCellColor(isSent, student.absentBefore)}>{student.absent} uur</td>
                                        <td className={setCellColor(isSent, student.absentBefore)}>{student.late} uur</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {
                    isSent ? null : <div className="card-actions justify-end">
                        <a className="btn btn-secondary btn-sm" onClick={onSent} href={`mailto:${emailInfo.email.toString()}?subject=${getSubject(emailInfo)}&cc=${emailInfo.lead}&body=${getBody(emailInfo)}`}>Send email</a>
                    </div>
                }
            </div>
        </div>
    )
}
