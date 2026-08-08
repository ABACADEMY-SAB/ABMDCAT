-- =====================================
-- ABACADEMY PostgreSQL Database
-- For Supabase
-- =====================================

-- =========================
-- ADMINS
-- =========================

CREATE TABLE admins (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admins (username, password, fullname)
VALUES (
'SAB@madina06',
'alishayan@24alimola',
'Super Admin'
);

-- =========================
-- STUDENTS
-- =========================

CREATE TABLE students (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    fullname VARCHAR(150),
    email VARCHAR(150),
    phone VARCHAR(30),
    theme VARCHAR(20) DEFAULT 'light',
    status VARCHAR(20) DEFAULT 'active',
    device_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);-- =========================
-- MCQs
-- =========================

CREATE TABLE mcqs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
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
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(200),
    description TEXT,
    subject VARCHAR(100),
    chapter VARCHAR(150),
    topic VARCHAR(150),
    total_questions INTEGER,
    duration INTEGER,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    status VARCHAR(20)
);

-- =========================
-- RESULTS
-- =========================

CREATE TABLE results (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    student_id BIGINT REFERENCES students(id) ON DELETE CASCADE,
    subject VARCHAR(100),
    chapter VARCHAR(150),
    topic VARCHAR(150),
    total_questions INTEGER,
    correct_answers INTEGER,
    wrong_answers INTEGER,
    percentage NUMERIC(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TEST RESULTS
-- =========================

CREATE TABLE test_results (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    student_id BIGINT REFERENCES students(id) ON DELETE CASCADE,
    test_id BIGINT REFERENCES online_tests(id) ON DELETE CASCADE,
    score INTEGER,
    total_questions INTEGER,
    percentage NUMERIC(5,2),
    time_taken INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);-- =========================
-- NOTES
-- =========================

CREATE TABLE notes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    subject VARCHAR(100),
    chapter VARCHAR(150),
    title VARCHAR(200),
    description TEXT,
    price NUMERIC(10,2),
    pdf_link TEXT
);

-- =========================
-- NOTES PURCHASES
-- =========================

CREATE TABLE notes_purchases (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    student_id BIGINT REFERENCES students(id) ON DELETE CASCADE,
    notes_id BIGINT REFERENCES notes(id) ON DELETE CASCADE,
    payment_method VARCHAR(100),
    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- NOTIFICATIONS
-- =========================

CREATE TABLE notifications (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(200),
    message TEXT,
    type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- BOOKMARKS
-- =========================

CREATE TABLE bookmarks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    student_id BIGINT REFERENCES students(id) ON DELETE CASCADE,
    mcq_id BIGINT REFERENCES mcqs(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- WRONG QUESTIONS
-- =========================

CREATE TABLE wrong_questions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    student_id BIGINT REFERENCES students(id) ON DELETE CASCADE,
    mcq_id BIGINT REFERENCES mcqs(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- ACTIVITY LOGS
-- =========================

CREATE TABLE activity_logs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    student_id BIGINT REFERENCES students(id) ON DELETE CASCADE,
    activity TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- UPLOADED FILES
-- =========================

CREATE TABLE uploaded_files (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    filename VARCHAR(255),
    filepath TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);