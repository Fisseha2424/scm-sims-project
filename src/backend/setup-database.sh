#!/bin/bash

# SIMS Database Setup Script
# This script helps set up the MySQL/MariaDB database for SIMS

echo "=== SIMS Database Setup ==="
echo ""

# Check if MySQL/MariaDB is running
if ! systemctl is-active --quiet mariadb && ! systemctl is-active --quiet mysql; then
    echo "⚠️  MySQL/MariaDB service is not running."
    echo "   Please start it with: sudo systemctl start mariadb (or mysql)"
    exit 1
fi

echo "Enter MySQL root password (press Enter if no password):"
read -s MYSQL_PASSWORD

if [ -z "$MYSQL_PASSWORD" ]; then
    MYSQL_CMD="mysql -u root"
else
    MYSQL_CMD="mysql -u root -p$MYSQL_PASSWORD"
fi

echo ""
echo "Creating database..."
$MYSQL_CMD <<EOF
CREATE DATABASE IF NOT EXISTS sims_db;
USE sims_db;
SOURCE $(pwd)/../../database/sims-schema.sql;
EOF

if [ $? -eq 0 ]; then
    echo "✅ Database setup complete!"
    echo ""
    echo "Sample login credentials:"
    echo "  Student ID: STU001"
    echo "  Password: password123"
else
    echo "❌ Database setup failed!"
    echo "You may need to:"
    echo "  1. Check your MySQL root password"
    echo "  2. Run the SQL file manually:"
    echo "     mysql -u root -p sims_db < ../../database/sims-schema.sql"
fi

