"use client";

import useSWR from "swr";
import type { Appointment } from "@/types/appointment";

const API_URL = process.env.PUBLIC_API_URL ?? "http://localhost:3000";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Paris",
  }).format(new Date(iso));

export default function Home() {
  const { data, error, isLoading } = useSWR<Appointment[]>(
    `${API_URL}/appointments`,
    fetcher,
  );

  if (error) return <p>Impossible de charger les rendez-vous.</p>;
  if (isLoading || !data) return <p>Chargement…</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Rendez-vous</h1>
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
