package student

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

func ReportHandler(pool *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		idParam := chi.URLParam(r, "id")
		id, err := strconv.Atoi(idParam)
		if err != nil {
			jsonError(w, "invalid student id", http.StatusBadRequest)
			return
		}

		s, err := FindByID(r.Context(), pool, id)
		if err != nil {
			if errors.Is(err, ErrNotFound) {
				jsonError(w, "student not found", http.StatusNotFound)
				return
			}
			log.Printf("error fetching student %d: %v", id, err)
			jsonError(w, "internal server error", http.StatusInternalServerError)
			return
		}

		pdfBytes, err := GenerateReport(s)
		if err != nil {
			log.Printf("error generating pdf for student %d: %v", id, err)
			jsonError(w, "failed to generate report", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/pdf")
		w.Header().Set("Content-Disposition", fmt.Sprintf(`attachment; filename="student-%d-report.pdf"`, id))
		w.Header().Set("Content-Length", strconv.Itoa(len(pdfBytes)))
		if _, err := w.Write(pdfBytes); err != nil {
			log.Printf("error writing pdf response for student %d: %v", id, err)
		}
	}
}

func jsonError(w http.ResponseWriter, msg string, status int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(map[string]string{"error": msg})
}
