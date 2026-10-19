import { marquee } from '../data/content.js'

// Sonsuz kayan yazı bandı (Stink / Anomaly); üzerine gelince durur
export default function Marquee() {
  const row = marquee.flatMap((w, i) => [
    <span key={`w${i}`}>{w}</span>,
    <i key={`s${i}`} aria-hidden="true">✳</i>,
  ])
  return (
    <section className="marquee" aria-label={marquee.join(', ')}>
      <div className="marquee-track" aria-hidden="true">
        <div>{row}</div>
        <div>{row}</div>
      </div>
    </section>
  )
}
