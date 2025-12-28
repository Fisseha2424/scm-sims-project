import React from 'react';

export default function StudentForm({ formData, errors, onChange, onBlur }) {
  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>
            Student ID <span style={{ color: 'var(--secondary)' }}>*</span>
          </label>
          <input
            type="text"
            name="student_id"
            className="input"
            value={formData.student_id || ''}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="e.g., ETS0456/13"
            style={{ background: 'rgba(0,0,0,0.2)' }}
          />
          {errors.student_id && (
            <div style={{ color: 'var(--secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              {errors.student_id}
            </div>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>
            Full Name <span style={{ color: 'var(--secondary)' }}>*</span>
          </label>
          <input
            type="text"
            name="name"
            className="input"
            value={formData.name || ''}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Enter full name"
            style={{ background: 'rgba(0,0,0,0.2)' }}
          />
          {errors.name && (
            <div style={{ color: 'var(--secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              {errors.name}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>
            Email Address <span style={{ color: 'var(--secondary)' }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            className="input"
            value={formData.email || ''}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="student@aastustudent.edu.et"
            style={{ background: 'rgba(0,0,0,0.2)' }}
          />
          {errors.email && (
            <div style={{ color: 'var(--secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              {errors.email}
            </div>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>
            Phone Number <span style={{ color: 'var(--secondary)' }}>*</span>
          </label>
          <input
            type="tel"
            name="phone"
            className="input"
            value={formData.phone || ''}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="+251911223344"
            style={{ background: 'rgba(0,0,0,0.2)' }}
          />
          {errors.phone && (
            <div style={{ color: 'var(--secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              {errors.phone}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>
            Department <span style={{ color: 'var(--secondary)' }}>*</span>
          </label>
          <input
            type="text"
            name="department"
            className="input"
            value={formData.department || ''}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="e.g., Computer Science"
            style={{ background: 'rgba(0,0,0,0.2)' }}
          />
          {errors.department && (
            <div style={{ color: 'var(--secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              {errors.department}
            </div>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>
            Year <span style={{ color: 'var(--secondary)' }}>*</span>
          </label>
          <select
            name="year"
            className="input"
            value={formData.year || ''}
            onChange={onChange}
            onBlur={onBlur}
            style={{ background: 'rgba(0,0,0,0.2)' }}
          >
            <option value="">Select Year</option>
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="4">Year 4</option>
            <option value="5">Year 5</option>
          </select>
          {errors.year && (
            <div style={{ color: 'var(--secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              {errors.year}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>
            GPA <span style={{ color: 'var(--secondary)' }}>*</span>
          </label>
          <input
            type="number"
            name="gpa"
            className="input"
            value={formData.gpa || ''}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="0.00 - 4.00"
            min="0"
            max="4"
            step="0.01"
            style={{ background: 'rgba(0,0,0,0.2)' }}
          />
          {errors.gpa && (
            <div style={{ color: 'var(--secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              {errors.gpa}
            </div>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>
            Password <span style={{ color: 'var(--secondary)' }}>*</span>
          </label>
          <input
            type="password"
            name="password"
            className="input"
            value={formData.password || ''}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Minimum 6 characters"
            style={{ background: 'rgba(0,0,0,0.2)' }}
          />
          {errors.password && (
            <div style={{ color: 'var(--secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              {errors.password}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

