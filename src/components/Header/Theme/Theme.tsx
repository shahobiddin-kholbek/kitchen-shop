'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const [initialTheme, setInitialTheme] = useState('light')
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    if (resolvedTheme !== undefined) {
      setInitialTheme(resolvedTheme)
      setMounted(true)
    }
  }, [resolvedTheme])

  useEffect(() => {
    if (mounted) {
      setTheme(initialTheme)
    }
  }, [mounted, initialTheme, setTheme])


  if (!mounted) {
    return null
  }

  return (
    <select className='border rounded-md' value={theme} onChange={e => setTheme(e.target.value)}>
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  )
}

export default ThemeSwitcher