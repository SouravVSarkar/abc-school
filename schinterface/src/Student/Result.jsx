import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
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

    // Grade calculation (frontend only, never sent to the database)
    const getGrade = (marks, outOf) => {

        if (
            marks === "" ||
            outOf === "" ||
            marks === undefined ||
            outOf === undefined ||
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

        const updatedSubjects = subjects.map((s, i) =>
            i === index ? { ...s, [field]: value } : s
        );

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

    // Submit result to backend (no grade is sent)
    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        const updatedSubjects = subjects.map((item) => ({
            subject: item.subject,
            marks: Number(item.marks),
            outOf: Number(item.outOf)
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

    // Download marksheet as PDF
    const downloadMarksheet = () => {

        if (!savedResult) {
            return;
        }

        const totalMarks = savedResult.subjects.reduce(
            (total, item) => total + Number(item.marks),
            0
        );

        const totalOutOf = savedResult.subjects.reduce(
            (total, item) => total + Number(item.outOf),
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

        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        const pageWidth = doc.internal.pageSize.getWidth();

        // Page border
        doc.setLineWidth(0.8);
        doc.rect(8, 8, pageWidth - 16, 281);

        // School name
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("LITTLE STARS ACADEMY", pageWidth / 2, 28, { align: "center" });

        // Title
        doc.setFontSize(16);
        doc.text("MARKSHEET", pageWidth / 2, 40, { align: "center" });

        doc.setLineWidth(0.5);
        doc.line(15, 45, pageWidth - 15, 45);

        // Student information
        doc.setFontSize(11);

        const info = [
            ["Name:", String(savedResult.name), "Class:", String(savedResult.className)],
            ["Roll:", String(savedResult.roll), "Registration:", String(savedResult.registration)],
            ["Exam Year:", String(savedResult.examYear), "", ""]
        ];

        let y = 55;

        info.forEach((row) => {

            doc.setFont("helvetica", "bold");
            doc.text(row[0], 15, y);
            doc.setFont("helvetica", "normal");
            doc.text(row[1], 40, y);

            if (row[2]) {
                doc.setFont("helvetica", "bold");
                doc.text(row[2], 110, y);
                doc.setFont("helvetica", "normal");
                doc.text(row[3], 140, y);
            }

            y += 8;

        });

        // Marks table
        autoTable(doc, {
            startY: y + 4,
            margin: { left: 15, right: 15 },
            head: [["Sl. No.", "Subject", "Marks Obtained", "Out Of", "Grade"]],
            body: savedResult.subjects.map((item, index) => [
                index + 1,
                item.subject,
                item.marks,
                item.outOf,
                getGrade(item.marks, item.outOf)
            ]),
            theme: "grid",
            styles: {
                halign: "center",
                fontSize: 11,
                cellPadding: 3,
                lineColor: [0, 0, 0],
                lineWidth: 0.2,
                textColor: [0, 0, 0]
            },
            headStyles: {
                fillColor: [238, 238, 238],
                textColor: [0, 0, 0],
                fontStyle: "bold"
            }
        });

        // Summary
        const summaryY = doc.lastAutoTable.finalY + 14;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(`Total Marks: ${totalMarks} / ${totalOutOf}`, 15, summaryY);
        doc.text(`Percentage: ${percentage.toFixed(2)}%`, pageWidth / 2, summaryY, { align: "center" });
        doc.text(`Grade: ${overallGrade}`, pageWidth - 15, summaryY, { align: "right" });

        // Signatures
        const signY = Math.max(summaryY + 40, 250);

        doc.setFont("helvetica", "normal");
        doc.line(15, signY, 65, signY);
        doc.text("Class Teacher", 15, signY + 6);

        doc.line(pageWidth - 65, signY, pageWidth - 15, signY);
        doc.text("Principal", pageWidth - 15, signY + 6, { align: "right" });

        doc.save(`${savedResult.name}-${savedResult.examYear}-marksheet.pdf`);

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
                        Download Marksheet (PDF)
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
                                        onChange={(e) =>
                                            handleSubjectChange(
                                                index,
                                                "outOf",
                                                e.target.value
                                            )
                                        }
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
