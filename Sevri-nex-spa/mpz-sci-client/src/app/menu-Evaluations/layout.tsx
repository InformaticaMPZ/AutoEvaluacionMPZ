'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { useGlobalState } from "@/store/globalState"
import { FaBuilding, FaSignOutAlt } from "react-icons/fa"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { department_name, verifyToken } = useGlobalState()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    verifyToken().then((result) => {
      if (result !== "success") {
        router.replace("/") // 🔥 CAMBIO CLAVE
      }
    })
  }, [])

  if (!mounted) return null

  const handleSignOut = () => {
    Cookies.remove("token")
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = "/"
  }

  return (
    <main className="bg-gradient-to-b from-[#001440] to-[#00102E] min-h-screen">
      <header className="w-full bg-[#001440] border-b border-blue-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <FaBuilding className="text-blue-400" size={16} />
            <span className="font-medium">Departamento:</span>
            <span className="font-bold">
              {department_name || "Cargando..."}
            </span>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
          >
            <FaSignOutAlt size={16} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </header>

      {children}
    </main>
  )
}