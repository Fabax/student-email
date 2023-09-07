import { useState } from "react";
import { getWeekDate, capitalize } from "./../helpers/helpers"


export default function EmailCard({ emailInfo, day }) {
    const [isSent, setIsSent] = useState(false)
    const ABSENT = 'Absent';
    const LATE = 'Te laat';
    const NOSHOW = 'Terugkomacties (niet gemeld voor terugkomen na te laat)';
    // console.log("emailInfo", emailInfo)


    const getBody = (emailInfo) => {

        // absent ============
        let absentArray = emailInfo.students.filter((student) => { return student.absent > 0  })
        let absentMessage = getListMessage(absentArray, ABSENT)

        // late ==========
        let lateArray = emailInfo.students.filter((student) => { return student.late > 0  })
        let lateMessage = getListMessage(lateArray, LATE)

        // NoShow ==========
        let noShowArray = emailInfo.students.filter((student) => { return student.noShow > 0  })
        let noShoMessage = getListMessage(noShowArray, NOSHOW)

        // studentStateList = [absentMessage, lateMessage, noShoMessage]
        let studentStateList = [];
        if (lateArray.length > 0 ) { studentStateList.push(absentMessage) }

        // ===========

        const isAbsent = absentArray.length > 0;
        const isLate = lateArray.length > 0;
        const isNoShow = noShowArray.length > 0;

        // message ===========
        let messageReason = ""

        if(isAbsent && isLate && isNoShow) { 
            messageReason = "absent of te laat was of zich niet gemeld heeft";
        }else if(isAbsent && isLate) {
            messageReason = "absent of te laat was";
        }else if(isLate && isNoShow) {
            messageReason = "te laat was of zich niet gemeld heeft";
        }else {
            if(isAbsent) {
                messageReason = "absent was"
            }else if(isLate) {
                messageReason = "te laat was"
            }
        }

        let messageReasonSubject = ""

        if(isAbsent && isLate && isNoShow) { 
            messageReasonSubject = "absenties, te laat meldingen en terugkomacties";
        }else if(isAbsent && isLate) {
            messageReasonSubject = "absenties en te laat meldingen";
        }else if(isLate && isNoShow) {
            messageReasonSubject = "te laat meldingen en terugkomacties";
        }else {
            if(isAbsent) {
                messageReasonSubject = "absenties"
            }else if(isLate) {
                messageReasonSubject = "te laat meldingen"
            }
        }

        // =====
        let bodyTop = `Beste ${emailInfo.teacher.map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort).map(({ value }) => value).map((v) => { return capitalize(v) }).join(" en ")},`
         let sujet = emailInfo.teacher.length > 1 ? 'jullie' : 'je'
        let line1 = `Bij deze stuur ik ${sujet} de lijst met ${messageReasonSubject} van deze week.`
        let bodyBottom = `Graag de check waarom de leerling ${messageReason} en een terugkoppeling geven aan jouw teamleider.%0AWaar nodig ook aan receptie om zaken in Magister te wijzigen.%0ADank!`
        


        let final = [bodyTop, line1]
        if (absentMessage !== '') { final.push(absentMessage) }
        if (lateMessage !== '') { final.push(lateMessage) }
        if (noShoMessage !== '') { final.push(noShoMessage) }
        final.push(bodyBottom)

        return final.join('%0A%0A')
    }

    const getListMessage = (array, title) => {

        let list = array.map((student) => {
            // extra message if the student was absent last week
            let absentBefore = title === ABSENT && student.absentBefore ? ', had ook verzuim vorige week.' : '.'
            
            // if the student is absent, the unit is hours, if the student is late, the unit is times
            let timingUnit = title === ABSENT ? 'uur' : 'keer';
            
            // could be hours or times
            let missedUnit = title === ABSENT ? student.absent : student.late

            return `- ${capitalize(student.name)} ${capitalize(student.lastName)} : ${missedUnit} ${timingUnit}${absentBefore}`
        }).join('%0A')

        let message = array.length > 0 ? `${title}:%0A${list}` : '';
        return message
    }

    const getSubject = (emailInfo) => {
        var weekNumber = getWeekDate()        
        let friSubject = `Verzuim week ${weekNumber} totaal - klas ${emailInfo.klas.toUpperCase()}`

        return friSubject
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
                            <th className={isSent ? "bg-emerald-500 text-white" : null}>Terugkomacties</th>
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
                                        <td className={setCellColor(isSent, student.absentBefore)}>{student.late} keer</td>
                                        <td className={setCellColor(isSent, student.absentBefore)}>{student.noShow} keer</td>
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
