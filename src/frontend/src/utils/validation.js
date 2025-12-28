/**
 * Validation utility functions for form validation
 */

// Email validation regex pattern
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation regex pattern (supports international format)
export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};

// Validate required field
export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

// Validate student ID format (alphanumeric with optional slashes)
export const validateStudentId = (studentId) => {
  if (!validateRequired(studentId)) {
    return false;
  }
  const studentIdRegex = /^[A-Z0-9\/]+$/i;
  return studentIdRegex.test(studentId);
};

// Validate GPA (0.0 to 4.0)
export const validateGPA = (gpa) => {
  const numGPA = parseFloat(gpa);
  return !isNaN(numGPA) && numGPA >= 0 && numGPA <= 4.0;
};

// Validate year (1 to 5)
export const validateYear = (year) => {
  const numYear = parseInt(year, 10);
  return !isNaN(numYear) && numYear >= 1 && numYear <= 5;
};

// Validate password (minimum 6 characters)
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Get validation error message
export const getValidationError = (field, value) => {
  switch (field) {
    case 'student_id':
      if (!validateRequired(value)) {
        return 'Student ID is required';
      }
      if (!validateStudentId(value)) {
        return 'Student ID must be alphanumeric';
      }
      return null;
    case 'name':
      if (!validateRequired(value)) {
        return 'Name is required';
      }
      return null;
    case 'email':
      if (!validateRequired(value)) {
        return 'Email is required';
      }
      if (!validateEmail(value)) {
        return 'Email must be a valid email address';
      }
      return null;
    case 'phone':
      if (!validateRequired(value)) {
        return 'Phone number is required';
      }
      if (!validatePhone(value)) {
        return 'Phone number must be in a valid format (e.g., +251911223344)';
      }
      return null;
    case 'department':
      if (!validateRequired(value)) {
        return 'Department is required';
      }
      return null;
    case 'year':
      if (!validateRequired(value)) {
        return 'Year is required';
      }
      if (!validateYear(value)) {
        return 'Year must be between 1 and 5';
      }
      return null;
    case 'gpa':
      if (!validateRequired(value)) {
        return 'GPA is required';
      }
      if (!validateGPA(value)) {
        return 'GPA must be between 0.0 and 4.0';
      }
      return null;
    case 'password':
      if (!validateRequired(value)) {
        return 'Password is required';
      }
      if (!validatePassword(value)) {
        return 'Password must be at least 6 characters';
      }
      return null;
    default:
      return null;
  }
};

// Validate entire form
export const validateForm = (formData) => {
  const errors = {};
  
  Object.keys(formData).forEach((field) => {
    const error = getValidationError(field, formData[field]);
    if (error) {
      errors[field] = error;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

