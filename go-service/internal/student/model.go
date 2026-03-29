package student

import "time"

type Student struct {
	ID                 int
	Name               string
	Email              string
	SystemAccess       bool
	Phone              *string
	Gender             *string
	DOB                *time.Time
	Class              *string
	Section            *string
	Roll               *int
	FatherName         *string
	FatherPhone        *string
	MotherName         *string
	MotherPhone        *string
	GuardianName       *string
	GuardianPhone      *string
	RelationOfGuardian *string
	CurrentAddress     *string
	PermanentAddress   *string
	AdmissionDate      *time.Time
	ReporterName       *string
}
