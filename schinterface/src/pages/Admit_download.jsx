
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

            // Get exam data from backend
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/exam/download/${className}`
            );

            const exam = response.data.exam;

            console.log("Exam data:", exam);

            // Create HTML container
            const container = document.createElement("div");

            container.innerHTML = `

                <div style="
                    width: 794px;
                    min-height: 1123px;
                    padding: 60px;
                    box-sizing: border-box;

                    background-color: white;
                    color: black;

                    font-family: Arial, sans-serif;
                ">

                    <h1 style="
                        text-align: center;
                        margin: 0 0 5px 0;

                        font-size: 30px;
                        font-weight: bold;

                        color: #000000;
                    ">
                        Little Stars Academy
                    </h1>


                    <h2 style="
                        text-align: center;
                        margin: 0 0 5px 0;

                        font-size: 21px;
                        font-weight: bold;

                        color: #000000;
                    ">
                        ${exam.examName}
                    </h2>


                    <h3 style="
                        text-align: center;
                        margin: 0 0 35px 0;

                        font-size: 18px;
                        font-weight: bold;

                        color: #000000;
                    ">
                        Class ${exam.class}
                    </h3>


                    <table style="
                        width: 100%;
                        border-collapse: collapse;

                        text-align: center;

                        font-size: 14px;
                        color: #000000;
                    ">

                        <thead>

                            <tr>

                                <th style="
                                    border: 1px solid #000000;
                                    padding: 12px;

                                    color: #000000;
                                    background-color: #ffffff;
                                ">
                                    Subject
                                </th>


                                <th style="
                                    border: 1px solid #000000;
                                    padding: 12px;

                                    color: #000000;
                                    background-color: #ffffff;
                                ">
                                    Date
                                </th>


                                <th style="
                                    border: 1px solid #000000;
                                    padding: 12px;

                                    color: #000000;
                                    background-color: #ffffff;
                                ">
                                    Time
                                </th>


                                <th style="
                                    border: 1px solid #000000;
                                    padding: 12px;

                                    color: #000000;
                                    background-color: #ffffff;
                                ">
                                    Duration
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            ${exam.exams.map(item => {

                                const date = new Date(
                                    item.examDate
                                ).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric"
                                });


                                return `

                                    <tr>

                                        <td style="
                                            border: 1px solid #000000;
                                            padding: 12px;

                                            color: #000000;
                                        ">
                                            ${item.subject}
                                        </td>


                                        <td style="
                                            border: 1px solid #000000;
                                            padding: 12px;

                                            color: #000000;
                                        ">
                                            ${date}
                                        </td>


                                        <td style="
                                            border: 1px solid #000000;
                                            padding: 12px;

                                            color: #000000;
                                        ">
                                            ${item.time}
                                        </td>


                                        <td style="
                                            border: 1px solid #000000;
                                            padding: 12px;

                                            color: #000000;
                                        ">
                                            ${item.duration} minutes
                                        </td>

                                    </tr>

                                `;

                            }).join("")}

                        </tbody>

                    </table>


                    <p style="
                        margin-top: 45px;

                        text-align: center;

                        font-size: 15px;

                        color: #000000;
                    ">
                        Please report to school before the examination time.
                    </p>


                </div>

            `;


            /*
             * IMPORTANT:
             * Add the container to the actual DOM.
             * This prevents html2canvas from generating
             * a blank PDF.
             */

            container.style.position = "absolute";
            container.style.left = "-9999px";
            container.style.top = "0";
            container.style.width = "794px";

            document.body.appendChild(container);


            // Give the browser time to render the HTML
            await new Promise(resolve => setTimeout(resolve, 100));


            // Convert HTML to PDF
            await html2pdf()
                .set({

                    margin: 0,

                    filename: `Class-${exam.class}-Exam-Routine.pdf`,

                    image: {
                        type: "jpeg",
                        quality: 1
                    },

                    html2canvas: {
                        scale: 2,

                        backgroundColor: "#ffffff",

                        useCORS: true,

                        logging: false
                    },

                    jsPDF: {
                        unit: "mm",

                        format: "a4",

                        orientation: "portrait"
                    }

                })
                .from(container)
                .save();


            // Remove temporary HTML
            document.body.removeChild(container);


            setMessage(
                "Exam routine downloaded successfully."
            );


        } catch (error) {

            console.error("Download error:", error);

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
                padding: "30px",
                maxWidth: "500px",
                margin: "auto"
            }}
        >

            <h2>
                Download Exam Routine
            </h2>


            <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}

                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "15px"
                }}
            >

                <option value="">
                    Select Class
                </option>


                <option value="1">
                    Class 1
                </option>


                <option value="2">
                    Class 2
                </option>


                <option value="3">
                    Class 3
                </option>


                <option value="4">
                    Class 4
                </option>


                <option value="5">
                    Class 5
                </option>


                <option value="6">
                    Class 6
                </option>


                <option value="7">
                    Class 7
                </option>


                <option value="8">
                    Class 8
                </option>


                <option value="9">
                    Class 9
                </option>


                <option value="10">
                    Class 10
                </option>

            </select>


            <button
                onClick={handleDownload}
                disabled={loading}

                style={{
                    width: "100%",
                    padding: "12px",

                    cursor: loading
                        ? "not-allowed"
                        : "pointer"
                }}
            >

                {loading
                    ? "Generating PDF..."
                    : "Download Exam Routine"
                }

            </button>


            {message && (

                <p
                    style={{
                        marginTop: "15px"
                    }}
                >
                    {message}
                </p>

            )}

        </div>

    );

}


// IMPORTANT:
// App.jsx imports this component as a default import.

export default DownloadExam;
