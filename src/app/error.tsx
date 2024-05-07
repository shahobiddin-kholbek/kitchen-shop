"use client"
import React from 'react'

export default function ErrorCP({ error }: { error: Error }) {
  return (
    <div>
        {error.message}
    </div>
  )
}
