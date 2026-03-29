-- ============================================================
-- CLEAN SLATE: truncate all seeded tables so re-runs are safe
-- Order respects foreign key dependencies (children first)
-- ============================================================
TRUNCATE
  permissions,
  user_leave_policy,
  user_leaves,
  notice_recipient_types,
  notices,
  class_teachers,
  user_profiles,
  users,
  leave_policies,
  departments,
  classes,
  sections,
  access_controls,
  notice_status,
  roles,
  leave_status
RESTART IDENTITY CASCADE;

-- ============================================================
-- ACCESS CONTROLS
-- ============================================================
INSERT INTO access_controls(
    name,
    path,
    icon,
    parent_path,
    hierarchy_id,
    type,
    method
)
VALUES
('Get my account detail', 'account', NULL, NULL, NULL, 'screen', NULL),
('Get permissions', '/api/v1/permissions', NULL, NULL, NULL, 'api', 'GET'),
('Get teachers', '/api/v1/teachers', NULL, NULL, NULL, 'api', 'GET'),

-- start dashboard
('Dashoard', '', NULL, NULL, NULL, 'screen', NULL),
('Get dashboard data', '/api/v1/dashboard', NULL, '', NULL, 'api', 'GET'),
-- end dashboard

-- start auth
('Resend email verification', '/api/v1/auth/resend-email-verification', NULL, NULL, NULL, 'api', 'POST'),
('Resend password setup link', '/api/v1/auth/resend-pwd-setup-link', NULL, NULL, NULL, 'api', 'POST'),
('Reset password', '/api/v1/auth/reset-pwd', NULL, NULL, NULL, 'api', 'POST'),
-- end auth


-- start leave
('Leave', 'leave_parent', 'leave.svg', NULL, 2, 'menu-screen', NULL),
('Leave Define', 'leave/define', NULL, 'leave_parent', 1, 'menu-screen', NULL),
('Leave Request', 'leave/request', NULL, 'leave_parent', 2, 'menu-screen', NULL),
('Pending Leave Request', 'leave/pending', NULL, 'leave_parent', 3, 'menu-screen', NULL),
('Add leave policy', '/api/v1/leave/policies', NULL, 'leave_parent', NULL, 'api', 'POST'),
('Get all leave policies', '/api/v1/leave/policies', NULL, 'leave_parent', NULL, 'api', 'GET'),
('Get my leave policies', '/api/v1/leave/policies/me', NULL, 'leave_parent', NULL, 'api', 'GET'),
('Update leave policy', '/api/v1/leave/policies/:id', NULL, 'leave_parent', NULL, 'api', 'PUT'),
('Handle policy status', '/api/v1/leave/policies/:id/status', NULL, 'leave_parent', NULL, 'api', 'POST'),
('Add user to policy', '/api/v1/leave/policies/:id/users', NULL, 'leave_parent', NULL, 'api', 'POST'),
('Get policy users', '/api/v1/leave/policies/:id/users', NULL, 'leave_parent', NULL, 'api', 'GET'),
('Remove user from policy', '/api/v1/leave/policies/:id/users', NULL, 'leave_parent', NULL, 'api', 'DELETE'),
('Get policy eligible users', '/api/v1/leave/policies/eligible-users', NULL, 'leave_parent', NULL, 'api', 'GET'),
('Get user leave history', '/api/v1/leave/request', NULL, 'leave_parent', NULL, 'api', 'GET'),
('Create new leave request', '/api/v1/leave/request', NULL, 'leave_parent', NULL, 'api', 'POST'),
('Update leave request', '/api/v1/leave/request/:id', NULL, 'leave_parent', NULL, 'api', 'PUT'),
('Delete leave request', '/api/v1/leave/request/:id', NULL, 'leave_parent', NULL, 'api', 'DELETE'),
('Get pending leave requests', '/api/v1/leave/pending', NULL, 'leave_parent', NULL, 'api', 'GET'),
('Handle leave request status', '/api/v1/leave/pending/:id/status', NULL, 'leave_parent', NULL, 'api', 'POST'),
-- end leave

--start academics
('Academics', 'academics_parent', 'academics.svg', NULL, 3, 'menu-screen', NULL),
('Classes', 'classes', NULL, 'academics_parent', 1, 'menu-screen', NULL),
('Class Teachers', 'class-teachers', NULL, 'academics_parent', 2, 'menu-screen', NULL),
('Sections', 'sections', NULL, 'academics_parent', 3, 'menu-screen', NULL),
('Classes Edit', 'classes/edit/:id', NULL, 'academics_parent', NULL, 'screen', NULL),
('Class Teachers Edit', 'class-teachers/edit/:id', NULL, 'academics_parent', NULL, 'screen', NULL),
('Get all classes', '/api/v1/classes', NULL, 'academics_parent', NULL, 'api', 'GET'),
('Get class detail', '/api/v1/classes/:id', NULL, 'academics_parent', NULL, 'api', 'GET'),
('Add new class', '/api/v1/classes', NULL, 'academics_parent', NULL, 'api', 'POST'),
('Update class detail', '/api/v1/classes/:id', NULL, 'academics_parent', NULL, 'api', 'PUT'),
('Delete class', '/api/v1/classes/:id', NULL, 'academics_parent', NULL, 'api', 'DELETE'),
('Get class with teacher details', '/api/v1/class-teachers', NULL, 'academics_parent', NULL, 'api', 'GET'),
('Add class teacher', '/api/v1/class-teachers', NULL, 'academics_parent', NULL, 'api', 'POST'),
('Get class teacher detail', '/api/v1/class-teachers/:id', NULL, 'academics_parent', NULL, 'api', 'GET'),
('Update class teacher detail', '/api/v1/class-teachers/:id', NULL, 'academics_parent', NULL, 'api', 'PUT'),
('Section Edit', 'sections/edit/:id', NULL, 'academics_parent', NULL, 'screen', NULL),
('Get all sections', '/api/v1/sections', NULL, 'academics_parent', NULL, 'api', 'GET'),
('Add new section', '/api/v1/sections', NULL, 'academics_parent', NULL, 'api', 'POST'),
('Get section detail', '/api/v1/sections/:id', NULL, 'academics_parent', NULL, 'api', 'GET'),
('Update section detail', '/api/v1/sections/:id', NULL, 'academics_parent', NULL, 'api', 'PUT'),
('Delete section', '/api/v1/sections/:id', NULL, 'academics_parent', NULL, 'api', 'DELETE'),
-- end academics

--start student
('Students', 'students_parent', 'students.svg', NULL, 4, 'menu-screen', NULL),
('Student List', 'students', NULL, 'students_parent', 1, 'menu-screen', NULL),
('Add Student', 'students/add', NULL, 'students_parent', 2, 'menu-screen', NULL),
('View Student', 'students/:id', NULL, 'students_parent', NULL, 'screen', NULL),
('Edit Student', 'students/edit/:id', NULL, 'students_parent', NULL, 'screen', NULL),
('Get students', '/api/v1/students', NULL, 'students_parent', NULL, 'api', 'GET'),
('Add new student', '/api/v1/students', NULL, 'students_parent', NULL, 'api', 'POST'),
('Get student detail', '/api/v1/students/:id', NULL, 'students_parent', NULL, 'api', 'GET'),
('Handle student status', '/api/v1/students/:id/status', NULL, 'students_parent', NULL, 'api', 'POST'),
('Update student detail', '/api/v1/students/:id', NULL, 'students_parent', NULL, 'api', 'PUT'),
('Delete student', '/api/v1/students/:id', NULL, 'students_parent', NULL, 'api', 'DELETE'),
-- end student

-- start communication
('Communication', 'communication_parent', 'communication.svg', NULL, 5, 'menu-screen', NULL),
('Notice Board', 'notices', NULL, 'communication_parent', 1, 'menu-screen', NULL),
('Add Notice', 'notices/add', NULL, 'communication_parent', 2, 'menu-screen', NULL),
('Manage Notices', 'notices/manage', NULL, 'communication_parent', 3, 'menu-screen', NULL),
('Notice Recipients', 'notices/recipients', NULL, 'communication_parent', 4, 'menu-screen', NULL),
('View Notice', 'notices/:id', NULL, 'communication_parent', NULL, 'screen', NULL),
('Edit Notice', 'notices/edit/:id', NULL, 'communication_parent', NULL, 'screen', NULL),
('Edit Recipient', 'notices/recipients/edit/:id', NULL, 'communication_parent', NULL, 'screen', NULL),
('Get notice recipient list', '/api/v1/notices/recipients/list', NULL, 'communication_parent', NULL, 'api', 'GET'),
('Get notice recipients', '/api/v1/notices/recipients', NULL, 'communication_parent', NULL, 'api', 'GET'),
('Get notice recipient detail', '/api/v1/notices/recipients/:id', NULL, 'communication_parent', NULL, 'api', 'GET'),
('Add new notice recipient', '/api/v1/notices/recipients', NULL, 'communication_parent', NULL, 'api', 'POST'),
('Update notice recipient detail', '/api/v1/notices/recipients/:id', NULL, 'communication_parent', NULL, 'api', 'PUT'),
('Delete notice recipient detail', '/api/v1/notices/recipients/:id', NULL, 'communication_parent', NULL, 'api', 'DELETE'),
('Handle notice status', '/api/v1/notices/:id/status', NULL, 'communication_parent', NULL, 'api', 'POST'),
('Get notice detail', '/api/v1/notices/:id', NULL, 'communication_parent', NULL, 'api', 'GET'),
('Get all notices', '/api/v1/notices', NULL, 'communication_parent', NULL, 'api', 'GET'),
('Add new notice', '/api/v1/notices', NULL, 'communication_parent', NULL, 'api', 'POST'),
('Update notice detail', '/api/v1/notices/:id', NULL, 'communication_parent', NULL, 'api', 'PUT'),
-- end communication

-- start hr
('Human Resource', 'hr_parent', 'hr.svg', NULL, 6, 'menu-screen', NULL),
('Staff List', 'staffs', NULL, 'hr_parent', 1, 'menu-screen', NULL),
('Add Staff', 'staffs/add', NULL, 'hr_parent', 2, 'menu-screen', NULL),
('Departments', 'departments', NULL, 'hr_parent', 3, 'menu-screen', NULL),
('View Staffs', 'staffs/:id', NULL, 'hr_parent', NULL, 'screen', NULL),
('Edit Staff', 'staffs/edit/:id', NULL, 'hr_parent', NULL, 'screen', NULL),
('Get all staffs', '/api/v1/staffs', NULL, 'hr_parent', NULL, 'api', 'GET'),
('Add new staff', '/api/v1/staffs', NULL, 'hr_parent', NULL, 'api', 'POST'),
('Get staff detail', '/api/v1/staffs/:id', NULL, 'hr_parent', NULL, 'api', 'GET'),
('Update staff detail', '/api/v1/staffs/:id', NULL, 'hr_parent', NULL, 'api', 'PUT'),
('Handle staff status', '/api/v1/staffs/:id/status', NULL, 'hr_parent', NULL, 'api', 'POST'),
('Edit Department', 'departments/edit/id', NULL, 'hr_parent', NULL, 'screen', NULL),
('Get all departments', '/api/v1/departments', NULL, 'hr_parent', NULL, 'api', 'GET'),
('Add new department', '/api/v1/departments', NULL, 'hr_parent', NULL, 'api', 'POST'),
('Get department detail', '/api/v1/departments/:id', NULL, 'hr_parent', NULL, 'api', 'GET'),
('Update department detail', '/api/v1/departments/:id', NULL, 'hr_parent', NULL, 'api', 'PUT'),
('Delete department', '/api/v1/departments/:id', NULL, 'hr_parent', NULL, 'api', 'DELETE'),
-- end hr

-- start access setting
('Access Setting', 'access_setting_parent', 'rolesAndPermissions.svg', NULL, 7, 'menu-screen', NULL),
('Roles & Permissions', 'roles-and-permissions', NULL, 'access_setting_parent', 1, 'menu-screen', NULL),
('Get all roles', '/api/v1/roles', NULL, 'access_setting_parent', NULL, 'api', 'GET'),
('Add new role', '/api/v1/roles', NULL, 'access_setting_parent', NULL, 'api', 'POST'),
('Switch user role', '/api/v1/roles/switch', NULL, 'access_setting_parent', NULL, 'api', 'POST'),
('Update role', '/api/v1/roles/:id', NULL, 'access_setting_parent', NULL, 'api', 'PUT'),
('Handle role status', '/api/v1/roles/:id/status', NULL, 'access_setting_parent', NULL, 'api', 'POST'),
('Get role detail', '/api/v1/roles/:id', NULL, 'access_setting_parent', NULL, 'api', 'GET'),
('Get role permissions', '/api/v1/roles/:id/permissions', NULL, 'access_setting_parent', NULL, 'api', 'GET'),
('Add role permissions', '/api/v1/roles/:id/permissions', NULL, 'access_setting_parent', NULL, 'api', 'POST'),
('Get role users', '/api/v1/roles/:id/users', NULL, 'access_setting_parent', NULL, 'api', 'GET')
-- end access setting
;

-- ============================================================
-- LOOKUP DATA
-- ============================================================
INSERT INTO leave_status (name) VALUES
('On Review'),
('Approved'),
('Cancelled');

INSERT INTO roles (name, is_editable)
VALUES ('Admin', false), ('Teacher', false), ('Student', false);

INSERT INTO notice_status (name, alias)
VALUES ('Draft', 'Draft'),
('Submit for Review', 'Approval Pending'),
('Submit for Deletion', 'Delete Pending'),
('Reject', 'Rejected'),
('Approve', 'Approved'),
('Delete', 'Deleted');

-- ============================================================
-- ACADEMIC STRUCTURE
-- ============================================================
INSERT INTO sections (name) VALUES ('A'), ('B'), ('C');

INSERT INTO classes (name, sections) VALUES
('Grade 1', 'A,B'),
('Grade 2', 'A,B,C'),
('Grade 3', 'A,B'),
('Grade 4', 'A'),
('Grade 5', 'A,B');

INSERT INTO departments (name) VALUES
('Mathematics'),
('Science'),
('English'),
('History');

-- ============================================================
-- USERS
-- Admin (id=1) placeholder; real password set via: npm run seed
-- ============================================================
INSERT INTO users (name, email, role_id, is_active, is_email_verified, created_dt)
VALUES ('Admin', 'admin@school-admin.com', 1, true, true, now());

-- Teachers (id=2..5)
INSERT INTO users (name, email, role_id, reporter_id, password, is_active, is_email_verified, created_dt) VALUES
('Sarah Miller', 'sarah.miller@school.com', 2, 1,
  '$argon2id$v=19$m=65536,t=3,p=4$21a+bDbESEI60WO1wRKnvQ$i6OrxqNiHvwtf1Xg3bfU5+AXZG14fegW3p+RSMvq1oU',
  true, true, now()),
('David Chen', 'david.chen@school.com', 2, 1,
  '$argon2id$v=19$m=65536,t=3,p=4$21a+bDbESEI60WO1wRKnvQ$i6OrxqNiHvwtf1Xg3bfU5+AXZG14fegW3p+RSMvq1oU',
  true, true, now()),
('Emily Watson', 'emily.watson@school.com', 2, 1,
  '$argon2id$v=19$m=65536,t=3,p=4$21a+bDbESEI60WO1wRKnvQ$i6OrxqNiHvwtf1Xg3bfU5+AXZG14fegW3p+RSMvq1oU',
  true, true, now()),
('Michael Brown', 'michael.brown@school.com', 2, 1,
  '$argon2id$v=19$m=65536,t=3,p=4$21a+bDbESEI60WO1wRKnvQ$i6OrxqNiHvwtf1Xg3bfU5+AXZG14fegW3p+RSMvq1oU',
  true, true, now());

-- Students (id=6..13)
INSERT INTO users (name, email, role_id, reporter_id, password, is_active, is_email_verified, created_dt) VALUES
('Alice Johnson', 'alice.johnson@student.com', 3, 2,
  '$argon2id$v=19$m=65536,t=3,p=4$21a+bDbESEI60WO1wRKnvQ$i6OrxqNiHvwtf1Xg3bfU5+AXZG14fegW3p+RSMvq1oU',
  true, true, now()),
('Bob Williams', 'bob.williams@student.com', 3, 2,
  '$argon2id$v=19$m=65536,t=3,p=4$21a+bDbESEI60WO1wRKnvQ$i6OrxqNiHvwtf1Xg3bfU5+AXZG14fegW3p+RSMvq1oU',
  true, true, now()),
('Charlie Davis', 'charlie.davis@student.com', 3, 3,
  '$argon2id$v=19$m=65536,t=3,p=4$21a+bDbESEI60WO1wRKnvQ$i6OrxqNiHvwtf1Xg3bfU5+AXZG14fegW3p+RSMvq1oU',
  true, true, now()),
('Diana Martinez', 'diana.martinez@student.com', 3, 3,
  '$argon2id$v=19$m=65536,t=3,p=4$21a+bDbESEI60WO1wRKnvQ$i6OrxqNiHvwtf1Xg3bfU5+AXZG14fegW3p+RSMvq1oU',
  true, true, now()),
('Ethan Garcia', 'ethan.garcia@student.com', 3, 4,
  '$argon2id$v=19$m=65536,t=3,p=4$21a+bDbESEI60WO1wRKnvQ$i6OrxqNiHvwtf1Xg3bfU5+AXZG14fegW3p+RSMvq1oU',
  true, true, now()),
('Fiona Lee', 'fiona.lee@student.com', 3, 4,
  '$argon2id$v=19$m=65536,t=3,p=4$21a+bDbESEI60WO1wRKnvQ$i6OrxqNiHvwtf1Xg3bfU5+AXZG14fegW3p+RSMvq1oU',
  true, true, now()),
('George Taylor', 'george.taylor@student.com', 3, 5,
  '$argon2id$v=19$m=65536,t=3,p=4$21a+bDbESEI60WO1wRKnvQ$i6OrxqNiHvwtf1Xg3bfU5+AXZG14fegW3p+RSMvq1oU',
  false, true, now()),
('Hannah Wilson', 'hannah.wilson@student.com', 3, 5,
  '$argon2id$v=19$m=65536,t=3,p=4$21a+bDbESEI60WO1wRKnvQ$i6OrxqNiHvwtf1Xg3bfU5+AXZG14fegW3p+RSMvq1oU',
  true, true, now());

-- ============================================================
-- USER PROFILES
-- ============================================================

-- Admin profile
INSERT INTO user_profiles (user_id) VALUES (1);

-- Teacher profiles
INSERT INTO user_profiles
(user_id, gender, marital_status, phone, dob, join_dt, qualification, experience, department_id, current_address, permanent_address, father_name, mother_name, emergency_phone)
VALUES
(2, 'Female', 'Single', '0423456789', '1990-07-22', '2021-02-15', 'BSc Mathematics', '5 years', 1, '10 Maths Ave, Melbourne VIC 3000', '10 Maths Ave, Melbourne VIC 3000', 'James Miller', 'Karen Miller', '0487654321'),
(3, 'Male', 'Married', '0434567890', '1988-11-03', '2019-06-01', 'MSc Physics', '8 years', 2, '25 Science Rd, Brisbane QLD 4000', '25 Science Rd, Brisbane QLD 4000', 'Wei Chen', 'Li Chen', '0476543210'),
(4, 'Female', 'Single', '0445678901', '1992-04-18', '2022-01-20', 'BA English Literature', '3 years', 3, '8 English Ln, Perth WA 6000', '8 English Ln, Perth WA 6000', 'Tom Watson', 'Jane Watson', '0465432109'),
(5, 'Male', 'Married', '0456789012', '1987-09-30', '2018-08-12', 'MA History', '10 years', 4, '15 History Ct, Adelaide SA 5000', '15 History Ct, Adelaide SA 5000', 'Alan Brown', 'Sue Brown', '0454321098');

-- Student profiles
INSERT INTO user_profiles
(user_id, gender, phone, dob, class_name, section_name, roll, admission_dt, current_address, permanent_address, father_name, father_phone, mother_name, mother_phone, guardian_name, guardian_phone, relation_of_guardian)
VALUES
(6,  'Female', '0467890123', '2012-05-10', 'Grade 1', 'A', 1,  '2024-01-15', '100 Oak St, Sydney', '100 Oak St, Sydney', 'Mark Johnson', '0411111111', 'Lisa Johnson', '0422222222', 'Mark Johnson', '0411111111', 'Father'),
(7,  'Male',   '0478901234', '2012-08-20', 'Grade 1', 'A', 2,  '2024-01-15', '200 Elm St, Sydney', '200 Elm St, Sydney', 'Tom Williams', '0433333333', 'Amy Williams', '0444444444', 'Tom Williams', '0433333333', 'Father'),
(8,  'Male',   '0489012345', '2011-03-14', 'Grade 2', 'A', 1,  '2023-01-10', '300 Pine Ave, Melbourne', '300 Pine Ave, Melbourne', 'James Davis', '0455555555', 'Emma Davis', '0466666666', 'James Davis', '0455555555', 'Father'),
(9,  'Female', '0490123456', '2011-11-25', 'Grade 2', 'B', 1,  '2023-01-10', '400 Cedar Dr, Melbourne', '400 Cedar Dr, Melbourne', 'Carlos Martinez', '0477777777', 'Rosa Martinez', '0488888888', 'Rosa Martinez', '0488888888', 'Mother'),
(10, 'Male',   '0401234567', '2010-07-08', 'Grade 3', 'A', 1,  '2022-02-01', '500 Birch Rd, Brisbane', '500 Birch Rd, Brisbane', 'Pedro Garcia', '0499999999', 'Maria Garcia', '0410101010', 'Pedro Garcia', '0499999999', 'Father'),
(11, 'Female', '0412345670', '2010-12-02', 'Grade 3', 'B', 1,  '2022-02-01', '600 Maple Ct, Brisbane', '600 Maple Ct, Brisbane', 'David Lee', '0420202020', 'Susan Lee', '0430303030', 'Susan Lee', '0430303030', 'Mother'),
(12, 'Male',   '0423456781', '2009-01-19', 'Grade 4', 'A', 1,  '2021-01-20', '700 Walnut St, Perth', '700 Walnut St, Perth', 'Richard Taylor', '0440404040', 'Beth Taylor', '0450505050', 'Richard Taylor', '0440404040', 'Father'),
(13, 'Female', '0434567892', '2009-06-30', 'Grade 5', 'A', 1,  '2021-01-20', '800 Spruce Ln, Adelaide', '800 Spruce Ln, Adelaide', 'Peter Wilson', '0460606060', 'Kate Wilson', '0470707070', 'Kate Wilson', '0470707070', 'Mother');

-- ============================================================
-- CLASS TEACHERS
-- ============================================================
INSERT INTO class_teachers (teacher_id, class_name, section_name) VALUES
(2, 'Grade 1', 'A'),
(2, 'Grade 1', 'B'),
(3, 'Grade 2', 'A'),
(3, 'Grade 2', 'B'),
(4, 'Grade 3', 'A'),
(4, 'Grade 3', 'B'),
(5, 'Grade 4', 'A'),
(5, 'Grade 5', 'A');

-- ============================================================
-- LEAVE POLICIES + ASSIGNMENTS
-- ============================================================
INSERT INTO leave_policies (name, is_active) VALUES
('Annual Leave', true),
('Sick Leave', true),
('Personal Leave', true);

-- Assign teachers and admin to leave policies
INSERT INTO user_leave_policy (user_id, leave_policy_id) VALUES
(1, 1), (1, 2),
(2, 1), (2, 2), (2, 3),
(3, 1), (3, 2),
(4, 1), (4, 3),
(5, 1), (5, 2), (5, 3);

-- ============================================================
-- LEAVE REQUESTS (mix of statuses)
-- ============================================================
INSERT INTO user_leaves (user_id, leave_policy_id, from_dt, to_dt, note, submitted_dt, status) VALUES
-- Sarah Miller: approved annual leave
(2, 1, '2026-04-01', '2026-04-03', 'Family vacation', now(), 1),
-- Sarah Miller: approved sick leave
(2, 2, '2026-03-10', '2026-03-11', 'Flu', now(), 2),
-- David Chen: pending annual leave
(3, 1, '2026-04-14', '2026-04-18', 'Conference attendance', now(), 1),
-- David Chen: cancelled request
(3, 2, '2026-02-20', '2026-02-21', 'Changed plans', now(), 3),
-- Emily Watson: pending personal leave
(4, 3, '2026-05-01', '2026-05-02', 'Moving house', now(), 1),
-- Michael Brown: approved annual leave
(5, 1, '2026-06-15', '2026-06-20', 'Summer holiday', now(), 2),
-- Michael Brown: pending sick leave
(5, 2, '2026-03-25', '2026-03-26', 'Dental appointment', now(), 1);

-- Update approved leaves with approver info
UPDATE user_leaves SET approved_dt = now(), approver_id = 1 WHERE status = 2;

-- ============================================================
-- NOTICES (mix of statuses)
-- ============================================================
INSERT INTO notices (author_id, title, description, status, recipient_type, created_dt) VALUES
(1, 'School Reopening', 'School reopens on Monday 7th April. All students must report by 8:30 AM.', 5, 'EV', now() - interval '7 days'),
(1, 'Parent-Teacher Meeting', 'PTM scheduled for Friday 11th April at 2:00 PM in the main hall.', 5, 'EV', now() - interval '5 days'),
(2, 'Maths Homework Reminder', 'All Grade 1 students must submit their maths worksheets by Wednesday.', 2, 'SP', now() - interval '2 days'),
(3, 'Science Fair', 'Science fair registration is now open. Submit your project proposals by end of month.', 1, 'EV', now() - interval '1 day'),
(1, 'Holiday Schedule', 'Updated holiday schedule for Term 2 has been posted.', 4, 'EV', now() - interval '3 days'),
(4, 'English Essay Competition', 'Annual essay competition entries due by April 25th. Topic: My Community.', 5, 'EV', now());

-- ============================================================
-- NOTICE RECIPIENT TYPES
-- ============================================================
INSERT INTO notice_recipient_types (role_id, primary_dependent_name, primary_dependent_select) VALUES
(2, 'Teacher', 'SELECT id, name FROM users WHERE role_id = 2'),
(3, 'Class', 'SELECT DISTINCT name AS id, name FROM classes');

-- ============================================================
-- ROLE PERMISSIONS (give admin all permissions)
-- ============================================================
INSERT INTO permissions (role_id, access_control_id, type)
SELECT 1, id, type FROM access_controls
ON CONFLICT DO NOTHING;

-- Give teachers a subset of permissions (leave, student view, notices)
INSERT INTO permissions (role_id, access_control_id, type)
SELECT 2, id, type FROM access_controls
WHERE path IN (
  'account', '', 'leave_parent', 'leave/request', 'leave/pending',
  'students_parent', 'students', 'students/:id',
  'communication_parent', 'notices', 'notices/add', 'notices/:id', 'notices/edit/:id'
)
OR path LIKE '/api/v1/leave/%'
OR path LIKE '/api/v1/students%'
OR path LIKE '/api/v1/notices%'
OR path IN ('/api/v1/dashboard', '/api/v1/teachers')
ON CONFLICT DO NOTHING;
