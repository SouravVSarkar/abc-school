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


            // Set PDF container properties
            container.style.width = "190mm";
            container.style.minHeight = "277mm";
            container.style.padding = "15mm";
            container.style.boxSizing = "border-box";

            container.style.backgroundColor = "#ffffff";
            container.style.color = "#000000";

            container.style.fontFamily = "Arial, sans-serif";
            container.style.opacity = "1";
            container.style.filter = "none";


            container.innerHTML = `

                <div style="
                    width: 100%;
                    background-color: #ffffff;
                    color: #000000;
                    opacity: 1;
                    filter: none;
                    font-family: Arial, sans-serif;
                ">


                    <!-- Academy Name -->

                    <h1 style="
                        text-align: center;
                        margin: 0 0 5px 0;
                        padding: 0;

                        font-family: Arial, sans-serif;
                        font-size: 28px;
                        font-weight: 700;

                        color: #000000 !important;
                        opacity: 1 !important;
                        filter: none !important;

                        -webkit-text-fill-color: #000000 !important;
                    ">
                        Little Stars Academy
                    </h1>


                    <!-- Exam Name -->

                    <h2 style="
                        text-align: center;
                        margin: 0 0 5px 0;
                        padding: 0;

                        font-family: Arial, sans-serif;
                        font-size: 20px;
                        font-weight: 700;

                        color: #000000 !important;
                        opacity: 1 !important;
                        filter: none !important;

                        -webkit-text-fill-color: #000000 !important;
                    ">
                        ${exam.examName}
                    </h2>


                    <!-- Class -->

                    <h3 style="
                        text-align: center;
                        margin: 0 0 30px 0;
                        padding: 0;

                        font-family: Arial, sans-serif;
                        font-size: 18px;
                        font-weight: 700;

                        color: #000000 !important;
                        opacity: 1 !important;
                        filter: none !important;

                        -webkit-text-fill-color: #000000 !important;
                    ">
                        Class ${exam.class}
                    </h3>


                    <!-- Exam Table -->

                    <table style="
                        width: 100%;
                        border-collapse: collapse;
                        table-layout: fixed;

                        text-align: center;

                        font-family: Arial, sans-serif;
                        font-size: 14px;

                        color: #000000 !important;
                        background-color: #ffffff;
                    ">


                        <thead>

                            <tr>


                                <!-- Subject -->

                                <th style="
                                    width: 25%;

                                    border: 1px solid #000000;
                                    padding: 10px;

                                    font-family: Arial, sans-serif;
                                    font-size: 14px;
                                    font-weight: 700;

                                    color: #000000 !important;
                                    background-color: #ffffff;

                                    opacity: 1 !important;
                                    -webkit-text-fill-color: #000000 !important;
                                ">
                                    Subject
                                </th>


                                <!-- Date -->

                                <th style="
                                    width: 25%;

                                    border: 1px solid #000000;
                                    padding: 10px;

                                    font-family: Arial, sans-serif;
                                    font-size: 14px;
                                    font-weight: 700;

                                    color: #000000 !important;
                                    background-color: #ffffff;

                                    opacity: 1 !important;
                                    -webkit-text-fill-color: #000000 !important;
                                ">
                                    Date
                                </th>


                                <!-- Time -->

                                <th style="
                                    width: 25%;

                                    border: 1px solid #000000;
                                    padding: 10px;

                                    font-family: Arial, sans-serif;
                                    font-size: 14px;
                                    font-weight: 700;

                                    color: #000000 !important;
                                    background-color: #ffffff;

                                    opacity: 1 !important;
                                    -webkit-text-fill-color: #000000 !important;
                                ">
                                    Time
                                </th>


                                <!-- Duration -->

                                <th style="
                                    width: 25%;

                                    border: 1px solid #000000;
                                    padding: 10px;

                                    font-family: Arial, sans-serif;
                                    font-size: 14px;
                                    font-weight: 700;

                                    color: #000000 !important;
                                    background-color: #ffffff;

                                    opacity: 1 !important;
                                    -webkit-text-fill-color: #000000 !important;
                                ">
                                    Duration
                                </th>

                            </tr>

                        </thead>


                        <tbody>


                            ${exam.exams.map(item => {

                                // Convert date into Indian format
                                const date = new Date(
                                    item.examDate
                                ).toLocaleDateString("en-IN");


                                return `

                                    <tr>


                                        <!-- Subject -->

                                        <td style="
                                            border: 1px solid #000000;
                                            padding: 10px;

                                            font-family: Arial, sans-serif;
                                            font-size: 14px;

                                            color: #000000 !important;
                                            background-color: #ffffff;

                                            opacity: 1 !important;
                                            -webkit-text-fill-color: #000000 !important;
                                        ">
                                            ${item.subject}
                                        </td>


                                        <!-- Date -->

                                        <td style="
                                            border: 1px solid #000000;
                                            padding: 10px;

                                            font-family: Arial, sans-serif;
                                            font-size: 14px;

                                            color: #000000 !important;
                                            background-color: #ffffff;

                                            opacity: 1 !important;
                                            -webkit-text-fill-color: #000000 !important;
                                        ">
                                            ${date}
                                        </td>


                                        <!-- Time -->

                                        <td style="
                                            border: 1px solid #000000;
                                            padding: 10px;

                                            font-family: Arial, sans-serif;
                                            font-size: 14px;

                                            color: #000000 !important;
                                            background-color: #ffffff;

                                            opacity: 1 !important;
                                            -webkit-text-fill-color: #000000 !important;
                                        ">
                                            ${item.time}
                                        </td>


                                        <!-- Duration -->

                                        <td style="
                                            border: 1px solid #000000;
                                            padding: 10px;

                                            font-family: Arial, sans-serif;
                                            font-size: 14px;

                                            color: #000000 !important;
                                            background-color: #ffffff;

                                            opacity: 1 !important;
                                            -webkit-text-fill-color: #000000 !important;
                                        ">
                                            ${item.duration} minutes
                                        </td>


                                    </tr>

                                `;

                            }).join("")}


                        </tbody>

                    </table>


                    <!-- Notice -->

                    <p style="
                        margin: 35px 0 0 0;
                        padding: 0;

                        text-align: center;

                        font-family: Arial, sans-serif;
                        font-size: 14px;

                        color: #000000 !important;
                        opacity: 1 !important;
                        filter: none !important;

                        -webkit-text-fill-color: #000000 !important;
                    ">
                        Please report to school before the examination time.
                    </p>


                </div>

            `;


            // Add container temporarily to the page
            container.style.position = "absolute";
            container.style.left = "-9999px";
            container.style.top = "0";

            document.body.appendChild(container);


            // Convert HTML into PDF
            await html2pdf()
                .set({

                    // No extra margin because we already added padding
                    margin: 0,

                    // PDF file name
                    filename: `Class-${exam.class}-Exam-Routine.pdf`,

                    // Image settings
                    image: {
                        type: "jpeg",
                        quality: 1
                    },

                    // HTML to canvas settings
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
                    },

                    // Prevent table rows from breaking
                    pagebreak: {
                        mode: [
                            "avoid-all",
                            "css",
                            "legacy"
                        ]
                    }

                })
                .from(container)
                .save();


            // Remove container after PDF is generated
            document.body.removeChild(container);


            // Show success message
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


            {/* Select class */}

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


            {/* Download button */}

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


            {/* Show message */}

            {message && (
                <p>
                    {message}
                </p>
            )}


        </div>

    );

}


export default DownloadExam;