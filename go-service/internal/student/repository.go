package student

import (
	"context"
	"errors"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

var ErrNotFound = errors.New("student not found")

func FindByID(ctx context.Context, pool *pgxpool.Pool, id int) (*Student, error) {
	query := `
		SELECT
			u.id,
			u.name,
			u.email,
			u.is_active,
			p.phone,
			p.gender,
			p.dob,
			p.class_name,
			p.section_name,
			p.roll,
			p.father_name,
			p.father_phone,
			p.mother_name,
			p.mother_phone,
			p.guardian_name,
			p.guardian_phone,
			p.relation_of_guardian,
			p.current_address,
			p.permanent_address,
			p.admission_dt,
			r.name
		FROM users u
		LEFT JOIN user_profiles p ON u.id = p.user_id
		LEFT JOIN users r ON u.reporter_id = r.id
		WHERE u.id = $1 AND u.role_id = 3`

	var s Student
	err := pool.QueryRow(ctx, query, id).Scan(
		&s.ID,
		&s.Name,
		&s.Email,
		&s.SystemAccess,
		&s.Phone,
		&s.Gender,
		&s.DOB,
		&s.Class,
		&s.Section,
		&s.Roll,
		&s.FatherName,
		&s.FatherPhone,
		&s.MotherName,
		&s.MotherPhone,
		&s.GuardianName,
		&s.GuardianPhone,
		&s.RelationOfGuardian,
		&s.CurrentAddress,
		&s.PermanentAddress,
		&s.AdmissionDate,
		&s.ReporterName,
	)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, ErrNotFound
		}
		return nil, err
	}

	return &s, nil
}
