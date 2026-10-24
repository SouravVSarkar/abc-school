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

        const exam = response.data.exam;

        console.log("Exam data:", exam);

        const container = document.createElement("div");

        container.innerHTML = `
            <div style="
                width: 794px;
                min-height: 1123px;
                padding: 60px;
                box-sizing: border-box;
                background: white;
                color: black;
                font-family: Arial, sans-serif;
            ">

                <h1 style="
                    text-align: center;
                    margin: 0 0 5px 0;
                    font-size: 30px;
                    font-weight: bold;
                    color: black;
                ">
                    Little Stars Academy
                </h1>

                <h2 style="
                    text-align: center;
                    margin: 0 0 5px 0;
                    font-size: 21px;
                    font-weight: bold;
                    color: black;
                ">
                    ${exam.examName}
                </h2>

                <h3 style="
                    text-align: center;
                    margin: 0 0 35px 0;
                    font-size: 18px;
                    font-weight: bold;
                    color: black;
                ">
                    Class ${exam.class}
                </h3>

                <table style="
                    width: 100%;
                    border-collapse: collapse;
                    text-align: center;
                    font-size: 14px;
                    color: black;
                ">

                    <thead>
                        <tr>
                            <th style="
                                border: 1px solid black;
                                padding: 12px;
                                color: black;
                                background: white;
                            ">
                                Subject
                            </th>

                            <th style="
                                border: 1px solid black;
                                padding: 12px;
                                color: black;
                                background: white;
                            ">
                                Date
                            </th>

                            <th style="
                                border: 1px solid black;
                                padding: 12px;
                                color: black;
                                background: white;
                            ">
                                Time
                            </th>

                            <th style="
                                border: 1px solid black;
                                padding: 12px;
                                color: black;
                                background: white;
                            ">
                                Duration
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        ${exam.exams.map(item => {

                            const date = new Date(item.examDate)
                                .toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric"
                                });

                            return `
                                <tr>

                                    <td style="
                                        border: 1px solid black;
                                        padding: 12px;
                                        color: black;
                                    ">
                                        ${item.subject}
                                    </td>

                                    <td style="
                                        border: 1px solid black;
                                        padding: 12px;
                                        color: black;
                                    ">
                                        ${date}
                                    </td>

                                    <td style="
                                        border: 1px solid black;
                                        padding: 12px;
                                        color: black;
                                    ">
                                        ${item.time}
                                    </td>

                                    <td style="
                                        border: 1px solid black;
                                        padding: 12px;
                                        color: black;
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
                    color: black;
                ">
                    Please report to school before the examination time.
                </p>

            </div>
        `;


        // IMPORTANT:
        // Add the HTML to the actual DOM
        container.style.position = "absolute";
        container.style.left = "-9999px";
        container.style.top = "0";

        document.body.appendChild(container);


        // Give browser time to render the HTML
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


        setMessage("Exam routine downloaded successfully.");


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
