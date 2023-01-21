import { useState } from "react"

export default function NavBar({ onToggle }) {
    const [isCheck, setChecked] = useState(false)

    const toggleDay = (e) => {
        setChecked(e.target.checked)
        let day = isCheck ? 'wed' : 'fri';
        onToggle(day)
    }

    return (
        <div className="navbar bg-primary text-primary-content">
            <div className="flex-1 justify-between">
                <a className="btn btn-ghost normal-case text-xl">Fab App</a>
                <div className="flex absolute left-1/2 -translate-x-1/2">
                    <span className="mr-4 font-bold ">Wed</span>
                    <input type="checkbox" className="toggle" defaultChecked={isCheck} onChange={toggleDay} />
                    <span className="ml-4 font-bold ">Fri</span>
                </div>
                <a className="mr-2 text-primary-content font-bold"
                    href="https://github.com/Fabax/student-email/blob/master/README.md" target="_blank">help</a>
            </div>
        </div>
    )
}