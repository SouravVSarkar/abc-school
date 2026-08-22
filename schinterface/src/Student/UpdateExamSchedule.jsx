import { useState } from "react";

function CreateExam() {
    const [form, setForm] = useState({
        class: "",
        examName: "",
        exams: [
            {
                subject: "",
                examDate: "",
                time: "",
                duration: "",
            },
        ],
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle class and exam name
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // Handle subject details
    const handleExamChange = (index, e) => {
        const updated = [...form.exams];

        updated[index] = {
            ...updated[index],
            [e.target.name]: e.target.value,
        };

        setForm({
            ...form,
            exams: updated,
        });
    };

    // Add another subject
    const addSubject = () => {
        setForm({
            ...form,
            exams: [
                ...form.exams,
                {
                    subject: "",
                    examDate: "",
                    time: "",
                    duration: "",
                },
            ],
        });
    };

    // Remove subject
    const removeSubject = (index) => {
        const updated = form.exams.filter(
            (_, i) => i !== index
        );

        setForm({
            ...form,
            exams: updated,
        });
    };

    // Update exam routine
const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
        const response = await fetch(
            "https://share-file-web.onrender.com/api/exam/update",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    class: Number(form.class),
                    examName: form.examName,
                    exams: form.exams.map((exam) => ({
                        subject: exam.subject,
                        examDate: exam.examDate,
                        time: exam.time,
                        duration: Number(exam.duration),
                    })),
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        setMessage("Exam routine updated successfully.");

    } catch (error) {
        console.error(error);
        setMessage(error.message || "Failed to update exam routine");
    }

    setLoading(false);
};

    return (
        <div
            style={{
                width: "600px",
                margin: "30px auto",
            }}
        >
            <h2>Update Exam Routine</h2>

            <form onSubmit={handleSubmit}>

                {/* Class */}
                <label>Class</label>

                <br />

                <select
                    name="class"
                    value={form.class}
                    onChange={handleChange}
                    required
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

                {/* Exam Name */}
                <label>Exam Name</label>

                <br />

                <input
                    name="examName"
                    placeholder="Exam Name"
                    value={form.examName}
                    onChange={handleChange}
                    required
                />

                <hr />

                {/* Subjects */}
                {form.exams.map((exam, index) => (
                    <div key={index}>

                        <h4>
                            Subject {index + 1}
                        </h4>

                        {/* Subject */}
                        <input
                            name="subject"
                            placeholder="Subject"
                            value={exam.subject}
                            onChange={(e) =>
                                handleExamChange(index, e)
                            }
                            required
                        />

                        <br />
                        <br />

                        {/* Exam Date */}
                        <input
                            type="date"
                            name="examDate"
                            value={exam.examDate}
                            onChange={(e) =>
                                handleExamChange(index, e)
                            }
                            required
                        />

                        <br />
                        <br />

                        {/* Exam Time */}
                        <input
                            type="time"
                            name="time"
                            value={exam.time}
                            onChange={(e) =>
                                handleExamChange(index, e)
                            }
                            required
                        />

                        <br />
                        <br />

                        {/* Duration */}
                        <input
                            type="number"
                            name="duration"
                            placeholder="Duration (Minutes)"
                            value={exam.duration}
                            onChange={(e) =>
                                handleExamChange(index, e)
                            }
                            required
                        />

                        <br />
                        <br />

                        {/* Remove */}
                        {form.exams.length > 1 && (
                            <button
                                type="button"
                                onClick={() =>
                                    removeSubject(index)
                                }
                            >
                                Remove Subject
                            </button>
                        )}

                        <hr />

                    </div>
                ))}

                {/* Add Subject */}
                <button
                    type="button"
                    onClick={addSubject}
                >
                    Add Subject
                </button>

                <br />
                <br />

                {/* Update */}
                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Updating..."
                        : "Update Exam"}
                </button>

            </form>

            <br />

            {message && (
                <p>
                    {message}
                </p>
            )}

        </div>
    );
}

export default CreateExam;