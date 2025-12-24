import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import apiClient from '../api/client';

export default function Grades() {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGrades();
    }, []);

    const fetchGrades = async () => {
        try {
            const response = await apiClient.get('/grades');
            if (response.data.success) {
                setEnrollments(response.data.enrollments);
            }
        } catch (error) {
            console.error('Error fetching grades:', error);
        } finally {
            setLoading(false);
        }
    };

    const getGradeColor = (grade) => {
        if (!grade) return 'var(--text-muted)';
        if (grade.startsWith('A')) return '#4ade80'; // Green
        if (grade.startsWith('B')) return '#60a5fa'; // Blue
        if (grade.startsWith('C')) return '#facc15'; // Yellow
        if (grade.startsWith('D')) return '#fb923c'; // Orange
        return '#f87171'; // Red
    };

    if (loading) return <Layout><div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div></Layout>;

    return (
        <Layout>
            <div className="page-header">
                <h1 className="page-title">My Grades</h1>
                <p className="page-subtitle">Academic performance and results</p>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Title</th>
                                <th>Units</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enrollments.length > 0 ? (
                                enrollments.map((enrol) => (
                                    <tr key={enrol.id}>
                                        <td>{enrol.course.code}</td>
                                        <td>{enrol.course.title}</td>
                                        <td>{enrol.course.credit_hours}</td>
                                        <td>
                                            <span style={{
                                                fontWeight: 800,
                                                fontSize: '1.1rem',
                                                color: getGradeColor(enrol.grade)
                                            }}>
                                                {enrol.grade || '-'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No grades available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
