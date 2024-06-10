import React from 'react'
import Hero from '../components/Hero'
import ListAnime from './ListAnime'
import ListManga from './ListManga'
import ListCharacter from './ListCharacter'

export default function Dashboard() {
  return (
    <>
      <Hero />
      <ListAnime />
      <ListManga />
      <ListCharacter />
    </>
    
  )
}
