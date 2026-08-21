import React, { useState } from "react";
import axios from "axios";
import "./AdminResult.css";

function AdminResult() {

    const [student, setStudent] = useState({
        name: "",
        className: "",
        roll: "",
        registration: "",
        examYear: ""
    });

    const [subjects, setSubjects] = useState([
        {
            subject: "",
            marks: ""
        }
    ]);

    const [savedResult, setSavedResult] = useState(null);

    const [loading, setLoading] = useState(false);


    const subjectList = [
        "Bengali",
        "English",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "Computer Science",
        "History",
        "Geography",
        "Political Science",
        "Economics"
    ];


    // Student information
    const handleStudentChange = (e) => {

        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });

    };


    // Subject and marks
    const handleSubjectChange = (index, field, value) => {

        const updatedSubjects = [...subjects];

        updatedSubjects[index][field] = value;

        setSubjects(updatedSubjects);

    };


    // Add subject
    const addSubject = () => {

        setSubjects([
            ...subjects,
            {
                subject: "",
                marks: ""
            }
        ]);

    };


    // Remove subject
    const removeSubject = (index) => {

        const updatedSubjects = subjects.filter(
            (_, i) => i !== index
        );

        setSubjects(updatedSubjects);

    };


    // Submit result to backend
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        const formData = {
            name: student.name,
            className: student.className,
            roll: student.roll,
            registration: student.registration,
            examYear: student.examYear,
            subjects: subjects
        };


        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/student-result/add`,
                formData
            );


            console.log(response.data);


            // Save returned database result
            setSavedResult(
                response.data.result
            );


        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to save result"
            );

        } finally {

            setLoading(false);

        }

    };


    // Add another result
    const addAnotherResult = () => {

        setStudent({
            name: "",
            className: "",
            roll: "",
            registration: "",
            examYear: ""
        });

        setSubjects([
            {
                subject: "",
                marks: ""
            }
        ]);

        setSavedResult(null);

    };


    // Download marksheet
    const downloadMarksheet = () => {

        if (!savedResult) {
            return;
        }


        const totalMarks =
            savedResult.subjects.reduce(
                (total, item) =>
                    total + Number(item.marks),
                0
            );


        const percentage =
            totalMarks /
            savedResult.subjects.length;


        const marksheetHTML = `

        <!DOCTYPE html>

        <html>

        <head>

            <meta charset="UTF-8">

            <title>Marksheet</title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    background: #eeeeee;
                    margin: 0;
                    padding: 30px;
                }

                .marksheet {

                    width: 800px;

                    margin: auto;

                    background: white;

                    padding: 40px;

                    border: 2px solid #222;

                }

                .school-name {

                    text-align: center;

                    font-size: 28px;

                    font-weight: bold;

                    margin-bottom: 5px;

                }

                .school-address {

                    text-align: center;

                    margin-bottom: 25px;

                }

                .title {

                    text-align: center;

                    font-size: 22px;

                    font-weight: bold;

                    margin-bottom: 25px;

                    border-bottom: 2px solid black;

                    padding-bottom: 10px;

                }

                .student-info {

                    display: grid;

                    grid-template-columns: 1fr 1fr;

                    gap: 12px;

                    margin-bottom: 25px;

                }

                table {

                    width: 100%;

                    border-collapse: collapse;

                }

                th, td {

                    border: 1px solid black;

                    padding: 12px;

                    text-align: center;

                }

                th {

                    background: #eeeeee;

                }

                .summary {

                    margin-top: 25px;

                    display: flex;

                    justify-content: space-between;

                    font-weight: bold;

                }

                .signature {

                    margin-top: 80px;

                    display: flex;

                    justify-content: space-between;

                }

                @media print {

                    body {

                        background: white;

                        padding: 0;

                    }

                    .marksheet {

                        border: 2px solid black;

                    }

                }

            </style>

        </head>


        <body>

            <div class="marksheet">

                <div class="school-name">
                    ABC SCHOOL
                </div>

                <div class="school-address">
                    School Examination Department
                </div>


                <div class="title">
                    MARKSHEET
                </div>


                <div class="student-info">

                    <div>
                        <strong>Name:</strong>
                        ${savedResult.name}
                    </div>

                    <div>
                        <strong>Class:</strong>
                        ${savedResult.className}
                    </div>

                    <div>
                        <strong>Roll:</strong>
                        ${savedResult.roll}
                    </div>

                    <div>
                        <strong>Registration:</strong>
                        ${savedResult.registration}
                    </div>

                    <div>
                        <strong>Exam Year:</strong>
                        ${savedResult.examYear}
                    </div>

                </div>


                <table>

                    <thead>

                        <tr>

                            <th>Sl. No.</th>

                            <th>Subject</th>

                            <th>Marks</th>

                        </tr>

                    </thead>


                    <tbody>

                        ${savedResult.subjects.map(
                            (item, index) => `

                            <tr>

                                <td>
                                    ${index + 1}
                                </td>

                                <td>
                                    ${item.subject}
                                </td>

                                <td>
                                    ${item.marks}
                                </td>

                            </tr>

                        `).join("")}

                    </tbody>

                </table>


                <div class="summary">

                    <div>
                        Total Marks:
                        ${totalMarks}
                    </div>

                    <div>
                        Percentage:
                        ${percentage.toFixed(2)}%
                    </div>

                </div>


                <div class="signature">

                    <div>
                        Class Teacher
                    </div>

                    <div>
                        Principal
                    </div>

                </div>

            </div>

        </body>

        </html>

        `;


        const blob = new Blob(
            [marksheetHTML],
            {
                type: "text/html"
            }
        );


        const url = URL.createObjectURL(blob);


        const link = document.createElement("a");

        link.href = url;

        link.download =
            `${savedResult.name}-${savedResult.examYear}-marksheet.html`;

        link.click();


        URL.revokeObjectURL(url);

    };


    // After successful submission
    if (savedResult) {

        return (

            <div className="success-container">

                <h2>
                    Result Saved Successfully
                </h2>

                <p>
                    {savedResult.name}'s result has been
                    successfully saved.
                </p>


                <div className="result-actions">

                    <button
                        onClick={downloadMarksheet}
                    >
                        Download Marksheet
                    </button>


                    <button
                        onClick={addAnotherResult}
                    >
                        Add Another Result
                    </button>

                </div>

            </div>

        );

    }


    return (

        <div className="admin-container">

            <h1>
                Student Result Entry
            </h1>


            <form onSubmit={handleSubmit}>

                <div className="student-information">

                    <h2>
                        Student Information
                    </h2>


                    <div className="form-group">

                        <label>
                            Student Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={student.name}
                            onChange={handleStudentChange}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Class
                        </label>

                        <select
                            name="className"
                            value={student.className}
                            onChange={handleStudentChange}
                            required
                        >

                            <option value="">
                                Select Class
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

                            <option value="11">
                                Class 11
                            </option>

                            <option value="12">
                                Class 12
                            </option>

                        </select>

                    </div>


                    <div className="form-group">

                        <label>
                            Roll Number
                        </label>

                        <input
                            type="number"
                            name="roll"
                            value={student.roll}
                            onChange={handleStudentChange}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Registration Number
                        </label>

                        <input
                            type="text"
                            name="registration"
                            value={student.registration}
                            onChange={handleStudentChange}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Exam Year
                        </label>

                        <input
                            type="number"
                            name="examYear"
                            value={student.examYear}
                            onChange={handleStudentChange}
                            required
                        />

                    </div>

                </div>


                <div className="subjects-section">

                    <h2>
                        Subjects & Marks
                    </h2>


                    {subjects.map(
                        (item, index) => (

                            <div
                                className="subject-row"
                                key={index}
                            >

                                <div>

                                    <label>
                                        Subject
                                    </label>

                                    <select
                                        value={item.subject}
                                        onChange={(e) =>
                                            handleSubjectChange(
                                                index,
                                                "subject",
                                                e.target.value
                                            )
                                        }
                                        required
                                    >

                                        <option value="">
                                            Select Subject
                                        </option>

                                        {subjectList.map(
                                            (subject) => (

                                                <option
                                                    key={subject}
                                                    value={subject}
                                                >
                                                    {subject}
                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>


                                <div>

                                    <label>
                                        Marks
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={item.marks}
                                        onChange={(e) =>
                                            handleSubjectChange(
                                                index,
                                                "marks",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>


                                {subjects.length > 1 && (

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeSubject(index)
                                        }
                                    >
                                        Remove
                                    </button>

                                )}

                            </div>

                        )
                    )}


                    <button
                        type="button"
                        onClick={addSubject}
                    >
                        + Add Subject
                    </button>

                </div>


                <div className="submit-section">

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Saving..."
                            : "Submit Result"
                        }

                    </button>

                </div>

            </form>

        </div>

    );

}

export default AdminResult;