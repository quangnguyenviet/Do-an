-- PostgreSQL Initialization Script for Tutor Application

-- Create database if not exists (Handled by POSTGRES_DB env variable)
-- Create uuid extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Log initialization
SELECT 'Database initialized successfully' AS status;
