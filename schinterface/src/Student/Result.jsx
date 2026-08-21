import React, { useState } from "react";

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

    // student information change
    const handleStudentChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    };

    // subject/marks change
    const handleSubjectChange = (index, field, value) => {

        const updatedSubjects = [...subjects];

        updatedSubjects[index][field] = value;

        setSubjects(updatedSubjects);
    };

    // add another subject
    const addSubject = () => {

        setSubjects([
            ...subjects,
            {
                subject: "",
                marks: ""
            }
        ]);
    };

    // remove subject
    const removeSubject = (index) => {

        const updatedSubjects = subjects.filter(
            (_, i) => i !== index
        );

        setSubjects(updatedSubjects);
    };

    // submit form
    const handleSubmit = (e) => {

        e.preventDefault();

        const resultData = {
            ...student,
            subjects: subjects
        };

        console.log("Student Result:");
        console.log(resultData);

        alert("Student result saved successfully!");
    };

    return (

        <div className="admin-container">

            <h1>Student Result Entry</h1>

            <form onSubmit={handleSubmit}>

                {/* Student Information */}

                <div className="student-information">

                    <h2>Student Information</h2>

                    <div className="form-group">

                        <label>Student Name</label>

                        <input
                            type="text"
                            name="name"
                            value={student.name}
                            onChange={handleStudentChange}
                            placeholder="Enter student name"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>Class</label>

                        <select
                            name="className"
                            value={student.className}
                            onChange={handleStudentChange}
                            required
                        >

                            <option value="">
                                Select Class
                            </option>

                            <option value="6">Class 6</option>
                            <option value="7">Class 7</option>
                            <option value="8">Class 8</option>
                            <option value="9">Class 9</option>
                            <option value="10">Class 10</option>
                            <option value="11">Class 11</option>
                            <option value="12">Class 12</option>

                        </select>

                    </div>


                    <div className="form-group">

                        <label>Roll Number</label>

                        <input
                            type="number"
                            name="roll"
                            value={student.roll}
                            onChange={handleStudentChange}
                            placeholder="Enter roll number"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>Registration Number</label>

                        <input
                            type="text"
                            name="registration"
                            value={student.registration}
                            onChange={handleStudentChange}
                            placeholder="Enter registration number"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>Exam Year</label>

                        <select
                            name="examYear"
                            value={student.examYear}
                            onChange={handleStudentChange}
                            required
                        >

                            <option value="">
                                Select Exam Year
                            </option>

                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>

                        </select>

                    </div>

                </div>


                {/* Subjects */}

                <div className="subjects-section">

                    <h2>Subjects & Marks</h2>

                    {subjects.map((item, index) => (

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

                                    {subjectList.map((subject) => (

                                        <option
                                            key={subject}
                                            value={subject}
                                        >
                                            {subject}
                                        </option>

                                    ))}

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
                                    placeholder="Marks"
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

                    ))}


                    <button
                        type="button"
                        onClick={addSubject}
                    >
                        + Add Subject
                    </button>

                </div>


                {/* Submit */}

                <div className="submit-section">

                    <button type="submit">
                        Save Student Result
                    </button>

                </div>

            </form>

        </div>
    );
}

export default AdminResult;