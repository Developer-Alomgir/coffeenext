"use client";
import Link from 'next/link';
import '../../styles/globals.css';

export default function Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#050510",
      }}
    >
      <div style={{ color: "#fff", textAlign: "center" }}>
        <h1 style={{ marginBottom: 8 }}>Projects page</h1>
        <p style={{ opacity: 0.8 }}>
          This is a placeholder projects page. Replace content as needed.
        </p>
      </div>
    </main>
  );
}
