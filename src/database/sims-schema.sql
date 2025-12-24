-- SIMS Database Schema
-- Student Information Management System

-- Create database
DROP DATABASE IF EXISTS sims_db;
CREATE DATABASE sims_db;
USE sims_db;

-- Students table
CREATE TABLE IF NOT EXISTS students (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    INDEX idx_student_id (student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    credit_hours INT NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    INDEX idx_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT UNSIGNED NOT NULL,
    course_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (student_id, course_id),
    INDEX idx_student_id (student_id),
    INDEX idx_course_id (course_id),
    grade VARCHAR(2) NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data for testing

-- Insert sample students (password_hash is bcrypt hash of 'password123')
INSERT INTO students (student_id, name, email, password_hash, phone, created_at, updated_at) VALUES
('ETS0456/13', 'Atsedework Worku', 'atsed.worku@aastustudent.edu.et', '$2y$12$.7A8kMs2B9pY9S8IqM7NHOQQniYdVznXeMKnJJ4LlzgIpnlFgHCo.', '+251911223344', NOW(), NOW()),
('ETS0457/13', 'Meron Tesfaye', 'meron.tesfaye@aastustudent.edu.et', '$2y$12$.7A8kMs2B9pY9S8IqM7NHOQQniYdVznXeMKnJJ4LlzgIpnlFgHCo.', '+251922334455', NOW(), NOW()),
('ETS0458/13', 'Yonas Bekele', 'yonas.bekele@aastustudent.edu.et', '$2y$12$.7A8kMs2B9pY9S8IqM7NHOQQniYdVznXeMKnJJ4LlzgIpnlFgHCo.', '+251933445566', NOW(), NOW());

-- Insert Semester 1 Courses (Year 1)
INSERT INTO courses (code, title, credit_hours, created_at, updated_at) VALUES
('CS101', 'Introduction to Computing', 3, NOW(), NOW()),
('MATH101', 'Applied Mathematics I', 4, NOW(), NOW()),
('PHYS101', 'General Physics I', 4, NOW(), NOW()),
('ENG101', 'Communicative English', 3, NOW(), NOW()),
('LOG101', 'Logic and Critical Thinking', 3, NOW(), NOW());

-- Insert Semester 2 Courses (Year 1)
INSERT INTO courses (code, title, credit_hours, created_at, updated_at) VALUES
('CS102', 'Programming Fundamentals (C++)', 4, NOW(), NOW()),
('MATH102', 'Applied Mathematics II', 4, NOW(), NOW()),
('PHYS102', 'General Physics II', 3, NOW(), NOW()),
('ENG102', 'Basic Writing Skills', 3, NOW(), NOW());

-- Insert Semester 3 Courses (Year 2)
INSERT INTO courses (code, title, credit_hours, created_at, updated_at) VALUES
('CS201', 'Data Structures and Algorithms', 4, NOW(), NOW()),
('CS202', 'Object Oriented Programming (Java)', 4, NOW(), NOW()),
('CS203', 'Database Management Systems', 4, NOW(), NOW()),
('MATH201', 'Discrete Mathematics', 3, NOW(), NOW());

-- Enroll Atsedework (Year 2 Student - Completed Year 1)
INSERT INTO enrollments (student_id, course_id, grade, created_at, updated_at) VALUES
-- Year 1 Sem 1
(1, 1, 'A', NOW(), NOW()),  -- CS101
(1, 2, 'A', NOW(), NOW()),  -- MATH101
(1, 3, 'B+', NOW(), NOW()), -- PHYS101
(1, 4, 'A', NOW(), NOW()),  -- ENG101
-- Year 1 Sem 2
(1, 6, 'A-', NOW(), NOW()), -- CS102
(1, 7, 'B', NOW(), NOW()),  -- MATH102
-- Year 2 Sem 1 (Current)
(1, 10, NULL, NOW(), NOW()), -- CS201 (In Progress)
(1, 11, NULL, NOW(), NOW()), -- CS202 (In Progress)
(1, 12, NULL, NOW(), NOW()); -- CS203 (In Progress)

-- Enroll Meron (Year 1 Student)
INSERT INTO enrollments (student_id, course_id, grade, created_at, updated_at) VALUES
(2, 1, 'A', NOW(), NOW()),
(2, 2, 'B+', NOW(), NOW()),
(2, 3, 'A-', NOW(), NOW()),
(2, 4, 'A', NOW(), NOW());

