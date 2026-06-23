import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shankari Dental Health Centre — Dr. H. L. Jayakumar | Rajajinagar, Bengaluru" },
      { name: "description", content: "Pediatric & cosmetic dentistry in Rajajinagar, Bengaluru. Dr. H. L. Jayakumar, BDS, MDS (Pedodontics) — 30+ years, 5.0★ from 242 patients." },
      { property: "og:title", content: "Shankari Dental Health Centre — Rajajinagar, Bengaluru" },
      { property: "og:description", content: "Gentle for your child. Precise for your smile. 30+ years of trusted dental care led by Dr. H. L. Jayakumar." },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/shankari.html");
  }, []);
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F4EDE2", color: "#0E2A2B", fontFamily: "serif" }}>
      <p>Loading Shankari Dental…</p>
    </div>
  );
}
