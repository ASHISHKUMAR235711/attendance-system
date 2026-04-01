-- Insert Dummy Students
INSERT INTO students (name, roll_number, class_grade, parent_contact, address) VALUES
('Aarav Patel', 'R001', '5A', '9876543210', 'Village North, House 12'),
('Diya Sharma', 'R002', '5A', '9876543211', 'Village East, House 05'),
('Vihaan Singh', 'R003', '5B', '9876543212', 'Village South, House 22'),
('Ananya Gupta', 'R004', '5B', '9876543213', 'Village West, House 08'),
('Rohan Kumar', 'R005', '6A', '9876543214', 'Village North, House 19')
ON CONFLICT (roll_number) DO NOTHING;

-- Insert Dummy Attendance (Assuming IDs 1-5 exist now, and using today's date or fixed dates)
-- Note: We use a subquery to get IDs to ensure safety, or just assume serial IDs if freshly created.
-- For safety in a script, let's just insert based on known roll numbers.

-- Attendance for Aarav (Present)
INSERT INTO attendance (student_id, date, status, remarks)
SELECT id, CURRENT_DATE, 'Present', '' FROM students WHERE roll_number = 'R001'
ON CONFLICT DO NOTHING;

-- Attendance for Diya (Absent)
INSERT INTO attendance (student_id, date, status, remarks)
SELECT id, CURRENT_DATE, 'Absent', 'Sick leave' FROM students WHERE roll_number = 'R002'
ON CONFLICT DO NOTHING;

-- Attendance for Vihaan (Late)
INSERT INTO attendance (student_id, date, status, remarks)
SELECT id, CURRENT_DATE, 'Late', 'Bus delay' FROM students WHERE roll_number = 'R003'
ON CONFLICT DO NOTHING;
