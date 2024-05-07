"use client"
import { useEffect, useState } from "react";
import './adminPanel.css'
import { useRouter } from 'next/navigation';
import AuthAdmin from "./auth/Auth";

export default function AdminPanel() {
  const [admin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      setIsAdmin(true);
      router.push('/admin-page');
    } else {
      setIsAdmin(false);
      router.push('/admin/');
    }
    setLoading(false);
  }, []);

  if (loading) {
    return null; 
  }

  return (
    <section className="flex justify-center">
      {!admin && (
        <AuthAdmin/>
      )}
      
    </section>
  );
}
