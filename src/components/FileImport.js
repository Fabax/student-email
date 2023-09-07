import { useState } from "react";
import { cleanArray, cleanCell } from "../helpers/helpers";
import { CheckCircleOutlined } from "@ant-design/icons";

export default function FileImport({ title, listType, onImported, optional }) {
    const [file, setFile] = useState();
    const [isClicked, setIsClicked] = useState(false);
    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setIsClicked(true)

        if (file) {
            fileReader.onload = function (event) {
                const csvOutput = event.target.result;
                csvFileJson(csvOutput);
            };
            fileReader.readAsText(file);
        }
    };

    const csvFileJson = string => {
        const csvHeaderRaw = string.slice(0, string.indexOf("\n")).split("\n")[0]
        const csvHeader = csvHeaderRaw.split(';').map(cleanCell).filter(cleanArray)

        const csvRowsRaw = string.slice(string.indexOf("\n") + 1).split("\n")
        const csvRows = csvRowsRaw.map(cleanCell).filter(cleanArray)

        const json = csvRows.map((row) => {
            let rowArray = row.split(";")
            let rowJson = {}

            rowArray.forEach((rowArg, index) => {
                let cleanRowArg = cleanCell(rowArg)
                rowJson[csvHeader[index]] = cleanRowArg
            });
            return rowJson;
        }).filter((object) => {
            return JSON.stringify(object) === '{}' ? false : true
        })

        // console.log("json", json);

        onImported(json)
    };

    return (
        <div className={isClicked ? `card w-1/2 shadow-xl m-1 bg-emerald-300` : `card w-1/2 bg-base-100 shadow-xl m-1`}>
            {
                optional ? <p className="absolute top-9 right-4 text-sm font-bold text-red-700">Optional</p> : null
            }
            <div className="card-body">
                <h3 className="card-title mb-6" >{title} {listType === 'students' ? '👨‍🎓' : '👩‍🏫'}</h3>
                <form >
                    <input className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold"
                        type={"file"} accept={".csv, .pdf"} onChange={handleOnChange} />
                    <div className="card-actions justify-center mt-6">
                        {file ?
                            <button className="btn btn-sm btn-primary text-primary-content" onClick={(e) => { handleOnSubmit(e); }}>import {listType}</button> :
                            <button className="btn btn-sm btn-ghost opacity-50" disabled >import {listType}</button>}
                    </div>
                </form>
                {
                    isClicked ? <CheckCircleOutlined className="absolute top-4 right-4" /> : null
                }
            </div>
        </div>
    );
}