<template>
  <el-container>
    <div class="page-container">
      <el-header class="title">
        <h3>个人游戏生涯喜好表</h3>
      </el-header>
      <el-main class="">
        <div class="game-grid-container">
          <div class="game-grid" v-for="item in gameCareerList" :key="item.grid_id">
            <div class="game-grid-imageContainer" @click="openSearchGameDialog(item)">
              <el-image
                :src="item.grid_image"
                v-if="item.grid_image"
                class="game-grid-imageContainer-image"
              ></el-image>
              <svg
                t="1702478767185"
                viewBox="0 0 1365 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4377"
                width="3rem"
                height="3rem"
                class="game-grid-imageContainer-button"
                v-else
              >
                <path
                  d="M1343.256195 443.661767C1285.275236 180.189471 1125.827601-8.248644 977.46456 0.277968h-5.968628A246.419073 246.419073 0 0 0 810.342975 59.964248a170.53223 170.53223 0 0 1-127.899173 57.128297A170.53223 170.53223 0 0 1 558.807935 63.374893 246.419073 246.419073 0 0 0 394.244332 0.277968h-6.821289C239.060003-8.248644 79.612367 180.189471 21.631409 443.661767c-62.244264 279.672858 14.49524 538.029187 170.53223 575.546277 114.256594 28.137818 239.597784-70.770876 323.158577-234.481817H852.976032c85.266115 164.563602 208.901982 262.619635 323.158577 234.481817 152.626346-38.369752 228.513189-295.87342 167.121586-575.546277z m-792.122211 15.3479H426.645456v130.457157H326.03144V459.009667H201.542912V354.132346h124.488528V223.675189H426.645456v130.457157h123.635867z m357.265023 12.789918a65.654909 65.654909 0 1 1 62.244264-65.654909 63.949586 63.949586 0 0 1-62.244264 65.654909z m197.817387 0a65.654909 65.654909 0 1 1 62.244264-65.654909 63.949586 63.949586 0 0 1-59.68628 65.654909z"
                  p-id="4378"
                ></path>
              </svg>
            </div>
            <div class="game-grid-type">{{ item.grid_name }}</div>
          </div>
        </div>
      </el-main>
      <search-game-dialog
        ref="dialogRef"
        v-model:dialogVisible="searchGameDialogVisible"
        :title="searchGameDialogTitle"
        @getGameGridUrl="getGridUrl"
      ></search-game-dialog>
    </div>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useGameCareerStore } from '@/stores'
import SearchGameDialog from '@/components/SearchGameDialog.vue'

const gameCareerStore = useGameCareerStore()
const { gameCareerList } = storeToRefs(gameCareerStore)
const dialogRef = ref(null)
const searchGameDialogTitle = ref('')
const searchGameDialogVisible = ref(false)
const openSearchGameDialog = (item) => {
  searchGameDialogTitle.value = item.grid_name
  searchGameDialogVisible.value = true
  dialogRef.value.dialogInit()
}

// get grid image url from component
const getGridUrl = (item) => {
  const arrayFindIndex = gameCareerList.value.findIndex(
    (item) => item.grid_name === searchGameDialogTitle.value
  )
  gameCareerList.value[arrayFindIndex].grid_image = item
  // put data in the local storage every time
  gameCareerStore.setGameCareerList(gameCareerList.value)
}
</script>

<style lang="scss" scoped>
.page-container {
  width: 50vw;
  margin: 0 auto;
}
.title {
  font-size: 40px;
  font-weight: bold;
  text-align: center;
}
.game-grid-container {
  max-width: 45vw;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: center;
  .game-grid {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 5px solid #000;
    border-radius: 10px;
    width: 160px;
    height: 256px;
    margin: 10px 10px;
    font-size: 16px;
    &-imageContainer {
      display: flex;
      justify-content: center;
      height: 208px;
      width: 100%;
      cursor: pointer;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      &-button {
        margin-top: 90px;
        padding: 5px;
        border: 1px solid transparent;
        border-radius: 9999px;
        background-color: #d1d5db;
      }
      &-image {
        width: 100%;
      }
    }
    &-imageContainer:hover {
      background-color: #9ca3af;
      transition: 0.3s linear;
    }
    &-imageContainer:not(:hover) {
      transition: 0.3s linear;
    }
    &-type {
      margin: auto 0;
    }
  }
}
</style>
