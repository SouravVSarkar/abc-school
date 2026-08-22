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
                            ).toLocaleDateString("en-IN");

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

                    // Important
                    useCORS: true,

                    // Don't log html2canvas messages
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