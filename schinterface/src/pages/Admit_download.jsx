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

            // Create HTML
            const container = document.createElement("div");

            container.innerHTML = `
                <div style="
                    width: 700px;
                    padding: 40px;
                    font-family: Arial, sans-serif;
                ">

                    <h1 style="
                        text-align: center;
                        margin-bottom: 5px;
                    ">
                        Little Stars Academy
                    </h1>

                    <h2 style="
                        text-align: center;
                        margin-bottom: 5px;
                    ">
                        ${exam.examName}
                    </h2>

                    <h3 style="
                        text-align: center;
                        margin-bottom: 30px;
                    ">
                        Class ${exam.class}
                    </h3>


                    <table style="
                        width: 100%;
                        border-collapse: collapse;
                        text-align: center;
                    ">

                        <thead>

                            <tr>

                                <th style="
                                    border: 1px solid black;
                                    padding: 10px;
                                ">
                                    Subject
                                </th>

                                <th style="
                                    border: 1px solid black;
                                    padding: 10px;
                                ">
                                    Date
                                </th>

                                <th style="
                                    border: 1px solid black;
                                    padding: 10px;
                                ">
                                    Time
                                </th>

                                <th style="
                                    border: 1px solid black;
                                    padding: 10px;
                                ">
                                    Duration
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            ${exam.exams.map(item => {

                                const date = new Date(
                                    item.examDate
                                ).toLocaleDateString("en-IN");

                                return `
                                    <tr>

                                        <td style="
                                            border: 1px solid black;
                                            padding: 10px;
                                        ">
                                            ${item.subject}
                                        </td>

                                        <td style="
                                            border: 1px solid black;
                                            padding: 10px;
                                        ">
                                            ${date}
                                        </td>

                                        <td style="
                                            border: 1px solid black;
                                            padding: 10px;
                                        ">
                                            ${item.time}
                                        </td>

                                        <td style="
                                            border: 1px solid black;
                                            padding: 10px;
                                        ">
                                            ${item.duration} minutes
                                        </td>

                                    </tr>
                                `;

                            }).join("")}

                        </tbody>

                    </table>


                    <p style="
                        margin-top: 40px;
                        text-align: center;
                    ">
                        Please report to school before the examination time.
                    </p>

                </div>
            `;


            // Convert HTML → PDF
            html2pdf()
                .set({
                    margin: 10,
                    filename: `Class-${exam.class}-Exam-Routine.pdf`,
                    image: {
                        type: "jpeg",
                        quality: 0.98
                    },
                    html2canvas: {
                        scale: 2
                    },
                    jsPDF: {
                        unit: "mm",
                        format: "a4",
                        orientation: "portrait"
                    }
                })
                .from(container)
                .save();


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


            {message && (
                <p>{message}</p>
            )}

        </div>
    );
}

export default DownloadExam;