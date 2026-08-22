import { useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";

function DownloadExam() {

    const [className, setClassName] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    const handleDownload = async () => {

        if (!className) {
            setMessage("Please select a class");
            return;
        }

        setLoading(true);
        setMessage("");


        try {

            // Get JSON from backend
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/exam/download/${className}`
            );

            const exam = response.data.exam;


            // Create HTML container
            const container = document.createElement("div");


            // A4 size in pixels
            container.style.width = "794px";
            container.style.minHeight = "1123px";

            container.style.padding = "60px";
            container.style.boxSizing = "border-box";

            container.style.background = "white";
            container.style.color = "black";

            container.style.fontFamily = "Arial, sans-serif";


            container.innerHTML = `

                <div style="
                    width: 100%;
                    background: white;
                    color: black;
                    font-family: Arial, sans-serif;
                ">


                    <!-- School Name -->

                    <h1 style="
                        text-align: center;

                        margin: 0;
                        margin-bottom: 5px;

                        padding: 0;

                        font-family: Arial, sans-serif;

                        font-size: 30px;
                        font-weight: bold;

                        color: black;
                    ">
                        Little Stars Academy
                    </h1>


                    <!-- Exam Name -->

                    <h2 style="
                        text-align: center;

                        margin: 0;
                        margin-bottom: 5px;

                        padding: 0;

                        font-family: Arial, sans-serif;

                        font-size: 21px;
                        font-weight: bold;

                        color: black;
                    ">
                        ${exam.examName}
                    </h2>


                    <!-- Class -->

                    <h3 style="
                        text-align: center;

                        margin: 0;
                        margin-bottom: 35px;

                        padding: 0;

                        font-family: Arial, sans-serif;

                        font-size: 18px;
                        font-weight: bold;

                        color: black;
                    ">
                        Class ${exam.class}
                    </h3>


                    <!-- Exam Table -->

                    <table style="
                        width: 100%;

                        border-collapse: collapse;

                        text-align: center;

                        font-family: Arial, sans-serif;

                        color: black;

                        background: white;
                    ">


                        <thead>

                            <tr>


                                <th style="
                                    border: 1px solid black;
                                    padding: 12px;

                                    font-size: 15px;
                                    font-weight: bold;

                                    color: black;
                                    background: white;
                                ">
                                    Subject
                                </th>


                                <th style="
                                    border: 1px solid black;
                                    padding: 12px;

                                    font-size: 15px;
                                    font-weight: bold;

                                    color: black;
                                    background: white;
                                ">
                                    Date
                                </th>


                                <th style="
                                    border: 1px solid black;
                                    padding: 12px;

                                    font-size: 15px;
                                    font-weight: bold;

                                    color: black;
                                    background: white;
                                ">
                                    Time
                                </th>


                                <th style="
                                    border: 1px solid black;
                                    padding: 12px;

                                    font-size: 15px;
                                    font-weight: bold;

                                    color: black;
                                    background: white;
                                ">
                                    Duration
                                </th>


                            </tr>

                        </thead>


                        <tbody>


                            ${exam.exams.map(item => {

                                // Getting exam date
                                const date = new Date(
                                    item.examDate
                                ).toLocaleDateString("en-IN");


                                return `

                                    <tr>


                                        <td style="
                                            border: 1px solid black;
                                            padding: 12px;

                                            font-size: 14px;

                                            color: black;
                                            background: white;
                                        ">
                                            ${item.subject}
                                        </td>


                                        <td style="
                                            border: 1px solid black;
                                            padding: 12px;

                                            font-size: 14px;

                                            color: black;
                                            background: white;
                                        ">
                                            ${date}
                                        </td>


                                        <td style="
                                            border: 1px solid black;
                                            padding: 12px;

                                            font-size: 14px;

                                            color: black;
                                            background: white;
                                        ">
                                            ${item.time}
                                        </td>


                                        <td style="
                                            border: 1px solid black;
                                            padding: 12px;

                                            font-size: 14px;

                                            color: black;
                                            background: white;
                                        ">
                                            ${item.duration} minutes
                                        </td>


                                    </tr>

                                `;

                            }).join("")}


                        </tbody>

                    </table>


                    <!-- Bottom Message -->

                    <p style="
                        margin-top: 45px;

                        text-align: center;

                        font-family: Arial, sans-serif;

                        font-size: 15px;

                        color: black;
                    ">
                        Please report to school before the examination time.
                    </p>


                </div>

            `;


            /*
             * Add container to the page.
             *
             * We are NOT moving it to -9999px because
             * html2canvas can sometimes capture a blank PDF
             * when the element is outside the viewport.
             */

            container.style.position = "fixed";
            container.style.left = "0";
            container.style.top = "0";

            container.style.zIndex = "-1";


            document.body.appendChild(container);


            /*
             * Convert HTML into PDF
             */

            await html2pdf()
                .set({

                    // PDF margin
                    margin: 0,

                    // PDF file name
                    filename: `Class-${exam.class}-Exam-Routine.pdf`,

                    // Image settings
                    image: {
                        type: "jpeg",
                        quality: 1
                    },

                    // HTML canvas settings
                    html2canvas: {

                        scale: 2,

                        useCORS: true,

                        backgroundColor: "#ffffff",

                        logging: false

                    },

                    // PDF settings
                    jsPDF: {

                        unit: "mm",

                        format: "a4",

                        orientation: "portrait"

                    }

                })
                .from(container)
                .save();


            /*
             * Remove HTML container
             * after PDF is generated
             */

            document.body.removeChild(container);


            setMessage(
                "Exam routine downloaded successfully."
            );


        } catch (error) {

            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Failed to download exam routine"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div
            style={{
                width: "400px",
                margin: "50px auto",
                textAlign: "center"
            }}
        >


            <h2>
                Download Exam Admit
            </h2>


            {/* Select Class */}

            <select
                value={className}
                onChange={(e) =>
                    setClassName(e.target.value)
                }
            >

                <option value="">
                    Select Class
                </option>


                {Array.from(
                    { length: 12 },
                    (_, index) => index + 1
                ).map(classNumber => (

                    <option
                        key={classNumber}
                        value={classNumber}
                    >
                        Class {classNumber}
                    </option>

                ))}

            </select>


            <br />
            <br />


            {/* Download Button */}

            <button
                onClick={handleDownload}
                disabled={loading}
            >

                {loading
                    ? "Generating..."
                    : "Download"}

            </button>


            <br />
            <br />


            {/* Show Message */}

            {message && (
                <p>
                    {message}
                </p>
            )}


        </div>

    );

}


export default DownloadExam;