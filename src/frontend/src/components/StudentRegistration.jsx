import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentForm from './StudentForm';
import { getValidationError, validateForm } from '../utils/validation';
import apiClient from '../api/client';

export default function StudentRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    student_id: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    year: '',
    gpa: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate field on blur
    const error = getValidationError(name, value);
    if (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate entire form
    const validation = validateForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiClient.post('/students/register', formData);

      if (response.data.success) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          student_id: '',
          name: '',
          email: '',
          phone: '',
          department: '',
          year: '',
          gpa: '',
          password: '',
        });
        setErrors({});
        setTouched({});

        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          // Backend validation errors
          setErrors(error.response.data.errors);
        } else {
          setSubmitError(error.response.data.message || 'Registration failed. Please try again.');
        }
      } else {
        setSubmitError('Network error. Please check your connection and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at top right, #1e1b4b, #0f172a)',
      padding: '2rem 1rem',
    }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '900px',
        padding: '2.5rem',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        background: 'rgba(30, 41, 59, 0.7)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', color: 'white' }}>
            Student Registration
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Register a new student account
          </p>
        </div>

        {submitSuccess && (
          <div style={{
            backgroundColor: 'rgba(34, 197, 94, 0.15)',
            color: '#86efac',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            textAlign: 'center',
            border: '1px solid rgba(34, 197, 94, 0.2)',
          }}>
            Registration successful! Redirecting to login...
          </div>
        )}

        {submitError && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            color: '#fca5a5',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            textAlign: 'center',
            border: '1px solid rgba(239, 68, 68, 0.2)',
          }}>
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <StudentForm
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="btn"
              onClick={() => navigate('/login')}
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'var(--text-muted)',
              }}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{ minWidth: '120px' }}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <p>
            Already have an account?{' '}
            <a
              href="/login"
              onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}
              style={{ color: 'var(--primary-light)', textDecoration: 'none' }}
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

