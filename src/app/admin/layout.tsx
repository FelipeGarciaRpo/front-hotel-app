'use client'
import VerticalNavbar from '@/components/admin-navbar/vertical-navbar'
import NavbarAdmin from '@/components/navbarAdmin/navbarA'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <div className="fixed top-0 left-0 w-full bg-black text-white navbar">
        <NavbarAdmin />{' '}
      </div>
      <div className="fixed top-16 left-0 w-64 h-[calc(100vh-64px)] bg-gray-800 text-white vertical-navbar">
        <VerticalNavbar />
      </div>

      <div className="ml-64 flex-1 overflow-y-auto">{children}</div>
    </div>
  )
}
