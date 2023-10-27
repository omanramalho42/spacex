import React from 'react'
import { Loading as LoadingComponent } from '../styles/home/styles'

export default function Loading() {
  return (
    <LoadingComponent>
      <div className="infinite-loading">
        👽
      </div>
    </LoadingComponent>
  )
}