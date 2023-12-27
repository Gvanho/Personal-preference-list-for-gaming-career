import { defineStore } from 'pinia'
import { ref } from 'vue'
import { gaming_career_grid_type } from '@/utils/data.js'

export const useGameCareerStore = defineStore(
  'gameCareer',
  () => {
    const gameCareerList = ref(
      JSON.parse(localStorage.getItem('gaming_career_grid_type')) || [...gaming_career_grid_type]
    )
    const setGameCareerList = (newList) => {
      gameCareerList.value = newList
      localStorage.setItem('gameCareerList', JSON.stringify(gameCareerList.value))
    }

    return {
      gameCareerList,
      setGameCareerList
    }
  },
  {
    persist: true
  }
)
