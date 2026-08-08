CREATE DATABASE IF NOT EXISTS abmdcat;
USE abmdcat;

-- =========================
-- ADMINS
-- =========================
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admins(username,password,fullname)
VALUES(
'SAB@madina06',
'alishayan@24alimola',
'Super Admin'
);

-- =========================
-- STUDENTS
-- =========================
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    fullname VARCHAR(150),
    email VARCHAR(150),
    phone VARCHAR(30),
    theme VARCHAR(20) DEFAULT 'light',
    status VARCHAR(20) DEFAULT 'active',
    device_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- MCQs
-- =========================
CREATE TABLE mcqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(100),
    chapter VARCHAR(150),
    topic VARCHAR(150),
    question TEXT,
    optionA TEXT,
    optionB TEXT,
    optionC TEXT,
    optionD TEXT,
    answer VARCHAR(5)
);

-- =========================
-- ONLINE TESTS
-- =========================
CREATE TABLE online_tests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200),
    description TEXT,
    subject VARCHAR(100),
    chapter VARCHAR(150),
    topic VARCHAR(150),
    total_questions INT,
    duration INT,
    start_time DATETIME,
    end_time DATETIME,
    status VARCHAR(20)
);

-- =========================
-- RESULTS
-- =========================
CREATE TABLE results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    subject VARCHAR(100),
    chapter VARCHAR(150),
    topic VARCHAR(150),
    total_questions INT,
    correct_answers INT,
    wrong_answers INT,
    percentage DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TEST RESULTS
-- =========================
CREATE TABLE test_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    test_id INT,
    score INT,
    total_questions INT,
    percentage DECIMAL(5,2),
    time_taken INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- NOTES
-- =========================
CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(100),
    chapter VARCHAR(150),
    title VARCHAR(200),
    description TEXT,
    price DECIMAL(10,2),
    pdf_link TEXT
);

-- =========================
-- NOTES PURCHASES
-- =========================
CREATE TABLE notes_purchases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    notes_id INT,
    payment_method VARCHAR(100),
    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- NOTIFICATIONS
-- =========================
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200),
    message TEXT,
    type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- BOOKMARKS
-- =========================
CREATE TABLE bookmarks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    mcq_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- WRONG QUESTIONS
-- =========================
CREATE TABLE wrong_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    mcq_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- ACTIVITY LOGS
-- =========================
CREATE TABLE activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    activity TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- UPLOADED FILES
-- =========================
CREATE TABLE uploaded_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255),
    filepath TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);