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
            marks: "",
            outOf: ""
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

    // Grade calculation
    const getGrade = (marks, outOf) => {

        if (
            marks === "" ||
            outOf === "" ||
            Number(outOf) <= 0
        ) {
            return "";
        }

        const percentage =
            (Number(marks) / Number(outOf)) * 100;

 
        if (percentage >= 75) return "A";
     
        if (percentage >= 50) return "B";
         
        if (percentage >= 25) return "C";

        return "D";
    };

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
                marks: "",
                outOf: ""
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

        const updatedSubjects = subjects.map((item) => ({
            subject: item.subject,
            marks: Number(item.marks),
            outOf: Number(item.outOf),
            grade: getGrade(item.marks, item.outOf)
        }));

        const formData = {
            name: student.name,
            className: student.className,
            roll: student.roll,
            registration: student.registration,
            examYear: student.examYear,
            subjects: updatedSubjects
        };

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/student-result/add`,
                formData
            );

            console.log(response.data);

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
                marks: "",
                outOf: ""
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

        const totalOutOf =
            savedResult.subjects.reduce(
                (total, item) =>
                    total + Number(item.outOf),
                0
            );

        const percentage =
            totalOutOf > 0
                ? (totalMarks / totalOutOf) * 100
                : 0;

        const overallGrade =
            percentage >= 90 ? "O+" :
            percentage >= 80 ? "O" :
            percentage >= 70 ? "A+" :
            percentage >= 60 ? "A" :
            percentage >= 50 ? "B+" :
            percentage >= 40 ? "B" :
            percentage >= 30 ? "C+" :
            percentage >= 20 ? "C" :
            "D";

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
                    gap: 20px;
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
                    LITTLE STARS ACADEMY
                </div>

                <div class="school-address">
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
                            <th>Marks Obtained</th>
                            <th>Out Of</th>
                            <th>Grade</th>
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

                                <td>
                                    ${item.outOf}
                                </td>

                                <td>
                                    ${item.grade}
                                </td>

                            </tr>

                        `).join("")}

                    </tbody>

                </table>

                <div class="summary">

                    <div>
                        Total Marks:
                        ${totalMarks} / ${totalOutOf}
                    </div>

                    <div>
                        Percentage:
                        ${percentage.toFixed(2)}%
                    </div>

                    <div>
                        Grade:
                        ${overallGrade}
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

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

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
                                        Marks Obtained
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        max={item.outOf || undefined}
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

                                <div>

                                    <label>
                                        Out Of
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        value={item.outOf}
                                        onChange={(e) => {

                                            const value =
                                                e.target.value;

                                            handleSubjectChange(
                                                index,
                                                "outOf",
                                                value
                                            );

                                        }}
                                        required
                                    />

                                </div>

                                <div>

                                    <label>
                                        Grade
                                    </label>

                                    <input
                                        type="text"
                                        value={getGrade(
                                            item.marks,
                                            item.outOf
                                        )}
                                        readOnly
                                        placeholder="Grade"
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
