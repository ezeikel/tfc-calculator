"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSunBright } from "@fortawesome/pro-solid-svg-icons"
import { trackEvent } from "@/lib/analytics"

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }

    // Track theme toggle
    trackEvent("theme_toggled", {
      theme: newTheme ? "dark" : "light"
    })
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className="bg-transparent">
      {isDark ? <FontAwesomeIcon icon={faSunBright} size="sm" /> : <FontAwesomeIcon icon={faMoon} size="sm" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export { ThemeToggle }
