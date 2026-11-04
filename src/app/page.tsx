"use client";

import useSWR from "swr";
import AppointmentForm from "@/components/AppointmentForm";
import { API_URL, fetcher } from "@/lib/api";
import type { Appointment } from "@/types/appointment";

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Paris",
  }).format(new Date(iso));

export default function Home() {
  const { data, error, isLoading, mutate } = useSWR<Appointment[]>(
    `${API_URL}/appointments`,
    fetcher,
  );

  if (error) return <p>Impossible de charger les rendez-vous.</p>;
  if (isLoading || !data) return <p>Chargement…</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Rendez-vous</h1>
      <AppointmentForm onCreated={() => mutate()} />
      <ul>
        {data.map((appointment) => (
          <li key={appointment.id}>
            {appointment.patient_name} – {formatDate(appointment.starts_at)} (
            {appointment.status})
          </li>
        ))}
      </ul>
    </main>
  );
}
