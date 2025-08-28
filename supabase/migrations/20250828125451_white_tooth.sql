-- Initialize database with proper charset and collation
CREATE DATABASE IF NOT EXISTS everest_kitchen CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user if not exists
CREATE USER IF NOT EXISTS 'everest_user'@'%' IDENTIFIED BY 'everest_password';
GRANT ALL PRIVILEGES ON everest_kitchen.* TO 'everest_user'@'%';
FLUSH PRIVILEGES;