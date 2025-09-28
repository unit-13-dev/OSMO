import Header from "@/components/landing-page/header"
import DTFPortfolio from "@/components/dtf/portfolio"
import Footer from "@/components/landing-page/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "DTF Portfolio | OSMO",
  description: "View and manage your Decentralized Token Fund portfolio on OSMO platform.",
}

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#111111]">
      <Header />
      <DTFPortfolio />
      <Footer />
    </main>
  )
}
