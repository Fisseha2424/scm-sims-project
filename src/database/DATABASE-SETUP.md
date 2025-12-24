# Database Setup Instructions

## Quick Setup

1. **Set MySQL password in `.env`**:
   ```bash
   cd src/backend
   nano .env
   # Update: DB_PASSWORD=your_mysql_password
   ```

2. **Create database and import schema**:
   ```bash
   mysql -u root -p
   ```
   Then in MySQL:
   ```sql
   CREATE DATABASE IF NOT EXISTS sims_db;
   USE sims_db;
   SOURCE /home/cipher/Documents/Project_list/Academic_projects/sims-scm-project/src/database/sims-schema.sql;
   EXIT;
   ```

   Or use the command line:
   ```bash
   mysql -u root -p sims_db < src/database/sims-schema.sql
   ```

## Test Login Credentials

After importing the schema, you can login with:

- **Student ID**: `ETS0456/13`
- **Password**: `password123`

Other available students:
- `ETS0457/13` / `password123` (Meron Tesfaye)
- `ETS0458/13` / `password123` (Yonas Bekele)
- `ETS0459/13` / `password123` (Selamawit Alemayehu)
- `ETS0460/13` / `password123` (Daniel Getachew)

## Verify Database Connection

```bash
cd src/backend
php artisan tinker
```

Then in tinker:
```php
DB::connection()->getPdo();
// Should return: PDO object
exit
```

