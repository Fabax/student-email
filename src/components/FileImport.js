import { useState } from "react";

export default function FileImport({ title, onImported }) {
    const [file, setFile] = useState();
    const [color, setColor] = useState("white")
    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                const csvOutput = event.target.result;
                csvFileJson(csvOutput);
                setColor("green")
            };

            fileReader.readAsText(file);
        }
    };

    const csvFileJson = string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split("\n")[0].split(';').filter(cleanArray)
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

        const json = csvRows.map((row) => {
            let rowArray = row.split(";").filter(cleanArray)
            let rowJson = {}

            rowArray.forEach((rowArg, index) => {
                rowJson[csvHeader[index].replace(/(\r\n|\n|\r)/gm, "").trim()] = rowArg
            });
            return rowJson;
        }).filter((object) => {
            return JSON.stringify(object) === '{}' ? false : true
        })

        onImported(json)
    };

    const cleanArray = (value) => {
        if (value !== '' && value !== '\r') {
            return true
        }
        return false
    }

    return (
        <div className="fileImport">
            <div >
                <p>Select {title}</p>
                <form style={{ background: color }}>
                    <input type={"file"} accept={".csv"} onChange={handleOnChange} />
                    {
                        file !== undefined ? <button onClick={(e) => { handleOnSubmit(e); }}>import {title}</button> : null
                    }
                </form>
            </div>
        </div>
    );
}