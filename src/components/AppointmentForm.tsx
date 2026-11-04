"use client";

import { useState, type SubmitEvent } from "react";
import { API_URL } from "@/lib/api";

type Props = {
  onCreated: () => void;
};

export default function AppointmentForm({ onCreated }: Props) {
  const [patientName, setPatientName] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointment: {
            patient_name: patientName,
            starts_at: new Date(startsAt).toISOString(),
            status: "pending",
          },
        }),
      });

      if (!response.ok) {
        setError("Impossible de créer le rendez-vous.");
        return;
      }

      setPatientName("");
      setStartsAt("");
      onCreated();
    } catch {
      setError("L'API ne répond pas.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <label>
        Nom du patient{" "}
        <input
          value={patientName}
          onChange={(event) => setPatientName(event.target.value)}
          required
        />
      </label>{" "}
      <label>
        Créneau{" "}
        <input
          type="datetime-local"
          value={startsAt}
          onChange={(event) => setStartsAt(event.target.value)}
          required
        />
      </label>{" "}
      <button type="submit" disabled={submitting}>
        {submitting ? "Envoi…" : "Réserver"}
      </button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
