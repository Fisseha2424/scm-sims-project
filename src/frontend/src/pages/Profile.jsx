import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import apiClient from '../api/client';

export default function Profile() {
    const [student, setStudent] = useState(null);
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await apiClient.get('/profile');
            if (response.data.success) {
                setStudent(response.data.student);
                setPhone(response.data.student.phone || '');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setMessage('');
        try {
            const response = await apiClient.post('/update-phone', { phone });
            if (response.data.success) {
                setStudent(response.data.student);
                setMessage('Phone updated successfully!');
            }
        } catch (error) {
            setMessage('Failed to update phone.');
            console.error(error);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <Layout><div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div></Layout>;

    return (
        <Layout>
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', md: { flexDirection: 'row' }, gap: '2rem', padding: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minWidth: '250px' }}>
                    <div style={{
                        width: '150px',
                        height: '150px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '4rem',
                        fontWeight: 700,
                        color: 'white',
                        marginBottom: '1.5rem',
                        border: '4px solid var(--bg-card)',
                        boxShadow: '0 0 0 2px var(--primary)'
                    }}>
                        {student?.name?.charAt(0)}
                    </div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{student?.name}</h2>
                    <div style={{
                        background: 'rgba(79, 70, 229, 0.1)',
                        color: 'var(--primary-light)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.875rem',
                        fontWeight: 600
                    }}>
                        Verified Student
                    </div>
                </div>

                <div style={{ flex: 1, borderLeft: '1px solid var(--border)', paddingLeft: '2rem' }}>
                    <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>Academic Information</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Student ID</label>
                            <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{student?.student_id}</div>
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Department</label>
                            <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Computer Science</div>
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Program</label>
                            <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>B.Sc. Regular</div>
                        </div>
                        <div>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Year</label>
                            <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Year 2</div>
                        </div>
                    </div>

                    <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>Contact Details</h3>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Email Address</label>
                        <div style={{ fontWeight: 600 }}>{student?.email}</div>
                    </div>

                    <form onSubmit={handleUpdate}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Phone Number</label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <input
                                    type="text"
                                    className="input"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+251..."
                                />
                                <button type="submit" className="btn btn-primary" disabled={updating}>
                                    {updating ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </div>

                        {message && <div style={{ color: message.includes('success') ? 'var(--primary-light)' : 'var(--secondary)' }}>{message}</div>}
                    </form>
                </div>
            </div>
        </Layout>
    );
}
