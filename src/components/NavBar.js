export default function NavBar({ onToggle }) {
    return (
        <div className="navbar bg-primary text-primary-content">
            <div className="flex-1 justify-between">
                <p className="btn btn-ghost normal-case text-xl">Fab App</p>
                <a className="mr-2 text-primary-content font-bold"
                    href="https://github.com/Fabax/student-email/blob/master/README.md" target="_blank" rel="noreferrer" >help</a>
            </div>
        </div>
    )
}