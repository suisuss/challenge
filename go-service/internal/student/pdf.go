package student

import (
	"bytes"
	"fmt"
	"time"

	"github.com/go-pdf/fpdf"
)

func GenerateReport(s *Student) ([]byte, error) {
	pdf := fpdf.New("P", "mm", "A4", "")
	pdf.SetAutoPageBreak(true, 20)
	pdf.AddPage()

	// Header
	pdf.SetFont("Arial", "B", 20)
	pdf.CellFormat(190, 12, "Student Report", "", 1, "C", false, 0, "")
	pdf.SetFont("Arial", "", 9)
	pdf.SetTextColor(120, 120, 120)
	pdf.CellFormat(190, 6, fmt.Sprintf("Generated on %s", time.Now().Format("02 Jan 2006, 03:04 PM")), "", 1, "C", false, 0, "")
	pdf.SetTextColor(0, 0, 0)
	pdf.Ln(6)

	// Divider
	drawDivider(pdf)
	pdf.Ln(4)

	// Basic Information
	sectionHeader(pdf, "Basic Information")
	fieldRow(pdf, "Name", s.Name)
	fieldRow(pdf, "Email", s.Email)
	fieldRow(pdf, "Gender", strVal(s.Gender))
	fieldRow(pdf, "Date of Birth", dateVal(s.DOB))
	fieldRow(pdf, "Phone", strVal(s.Phone))
	fieldRow(pdf, "Status", boolVal(s.SystemAccess, "Active", "Inactive"))
	pdf.Ln(4)

	// Academic Information
	sectionHeader(pdf, "Academic Information")
	fieldRow(pdf, "Class", strVal(s.Class))
	fieldRow(pdf, "Section", strVal(s.Section))
	fieldRow(pdf, "Roll Number", intVal(s.Roll))
	fieldRow(pdf, "Admission Date", dateVal(s.AdmissionDate))
	fieldRow(pdf, "Class Teacher", strVal(s.ReporterName))
	pdf.Ln(4)

	// Parent / Guardian Information
	sectionHeader(pdf, "Parent / Guardian Information")
	fieldRow(pdf, "Father's Name", strVal(s.FatherName))
	fieldRow(pdf, "Father's Phone", strVal(s.FatherPhone))
	fieldRow(pdf, "Mother's Name", strVal(s.MotherName))
	fieldRow(pdf, "Mother's Phone", strVal(s.MotherPhone))
	fieldRow(pdf, "Guardian Name", strVal(s.GuardianName))
	fieldRow(pdf, "Guardian Phone", strVal(s.GuardianPhone))
	fieldRow(pdf, "Relation", strVal(s.RelationOfGuardian))
	pdf.Ln(4)

	// Address Information
	sectionHeader(pdf, "Address Information")
	fieldRow(pdf, "Current Address", strVal(s.CurrentAddress))
	fieldRow(pdf, "Permanent Address", strVal(s.PermanentAddress))

	// Footer with page number
	pdf.SetY(-15)
	pdf.SetFont("Arial", "", 8)
	pdf.SetTextColor(150, 150, 150)
	pdf.CellFormat(0, 10, fmt.Sprintf("Page %d", pdf.PageNo()), "", 0, "C", false, 0, "")

	var buf bytes.Buffer
	if err := pdf.Output(&buf); err != nil {
		return nil, fmt.Errorf("generating pdf: %w", err)
	}

	return buf.Bytes(), nil
}

func sectionHeader(pdf *fpdf.Fpdf, title string) {
	pdf.SetFont("Arial", "B", 13)
	pdf.SetTextColor(40, 40, 40)
	pdf.CellFormat(190, 9, title, "", 1, "L", false, 0, "")
	pdf.SetDrawColor(200, 200, 200)
	pdf.Line(pdf.GetX(), pdf.GetY(), pdf.GetX()+190, pdf.GetY())
	pdf.Ln(3)
	pdf.SetTextColor(0, 0, 0)
}

func fieldRow(pdf *fpdf.Fpdf, label, value string) {
	if value == "" {
		value = "-"
	}
	pdf.SetFont("Arial", "B", 10)
	pdf.CellFormat(55, 7, label, "", 0, "L", false, 0, "")
	pdf.SetFont("Arial", "", 10)
	pdf.CellFormat(135, 7, value, "", 1, "L", false, 0, "")
}

func drawDivider(pdf *fpdf.Fpdf) {
	pdf.SetDrawColor(180, 180, 180)
	pdf.Line(10, pdf.GetY(), 200, pdf.GetY())
}

func strVal(s *string) string {
	if s == nil {
		return ""
	}
	return *s
}

func dateVal(t *time.Time) string {
	if t == nil {
		return ""
	}
	return t.Format("02 Jan 2006")
}

func intVal(i *int) string {
	if i == nil {
		return ""
	}
	return fmt.Sprintf("%d", *i)
}

func boolVal(b bool, trueStr, falseStr string) string {
	if b {
		return trueStr
	}
	return falseStr
}
