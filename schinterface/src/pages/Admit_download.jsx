import { useState } from "react";
import axios from "axios";

function DownloadExam() {

    const [className, setClassName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {

        if (!className) {
            setMessage("Please select a class");
            return;
        }

        setLoading(true);
        setMessage("");

        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/exam/download/${className}`
            );

            console.log(response.data);

            setMessage(
                "Exam schedule found successfully."
            );

            // PDF download will be added here later

        } catch (error) {

            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Failed to download exam admit"
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

            <h2>Download Exam Admit</h2>

            <br />

            <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
            >

                <option value="">
                    Select Class
                </option>

                {Array.from(
                    { length: 12 },
                    (_, index) => index + 1
                ).map((classNumber) => (

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
                    ? "Loading..."
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