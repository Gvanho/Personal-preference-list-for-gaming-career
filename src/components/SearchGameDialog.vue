<template>
  <el-container>
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="45%"
      :close-on-click-modal="false"
      :show-close="false"
      draggable
    >
      <div class="dialogContent">
        <div class="dialogContent-inputArea">
          <el-input
            v-model="inputSearchGame"
            class="dialogContent-inputArea-inputField"
            placeholder="请输入游戏名（使用英文名）"
            clearable
            :autofocus="true"
            @keyup.enter="searchGameHandler"
          ></el-input>
          <el-button
            type="info"
            :icon="Search"
            plain
            text
            :loading="searchButtonLoading"
            @click="searchGameHandler"
          >
            搜索
          </el-button>
        </div>
        <div class="dialogContent-searchResultList" v-if="searchGmaeResults.length > 0">
          <el-button
            type="info"
            plain
            round
            v-for="item in searchGmaeResults"
            :key="item.id"
            :loading="item.loading"
            class="dialogContent-searchResultList-button"
            @click="getGameGridHandler(item)"
          >
            {{ item.name }}
          </el-button>
        </div>
        <div class="dialogContent-gridResultList" v-if="gameGridResults.length > 0">
          <el-image
            class="dialogContent-gridResultList-image"
            v-for="item in gameGridResults"
            :key="item.id"
            :src="item.url"
            fit="cover"
            lazy
            @click="chooseGameGrid(item)"
          ></el-image>
        </div>
        <el-empty :image-size="100" description="No Data" v-show="emptyResultVisible" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleDialogCancel">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import to from 'await-to-js'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { searchGameService, getGameGridByIdService } from '@/api/steamGrid.js'

const inputSearchGame = ref('')
const searchGmaeResults = ref([])
const gameGridResults = ref([])
let searchButtonLoading = ref(false)
let emptyResultVisible = ref(false)
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String
  }
})
const emits = defineEmits(['update:dialogVisible', 'getGameGridUrl'])
const dialogVisible = computed({
  get: () => {
    return props.dialogVisible
  },
  set: (visible) => {
    emits('update:dialogVisible', visible)
  }
})
const dialogInit = () => {
  inputSearchGame.value = ''
  searchGmaeResults.value.length = 0
  gameGridResults.value.length = 0
  emptyResultVisible.value = false
}
const handleDialogCancel = () => {
  dialogInit()
  dialogVisible.value = false
}

// search game service
const searchGameHandler = async () => {
  if (!inputSearchGame.value) {
    ElMessage.error('请输入游戏名称')
  }
  emptyResultVisible.value = false
  searchButtonLoading.value = true
  const [err, res] = await to(searchGameService(inputSearchGame.value))
  if (err) {
    const errMsg = err.message || '服务异常'
    ElMessage.error(errMsg)
    searchButtonLoading.value = false
    return
  }
  if (res.length === 0) {
    emptyResultVisible.value = true
    searchButtonLoading.value = false
    return
  }
  gameGridResults.value.length = 0
  searchGmaeResults.value = res
  searchButtonLoading.value = false
}

// get game grid service
const getGameGridHandler = async (item) => {
  item.loading = true
  emptyResultVisible.value = false
  const [err, res] = await to(getGameGridByIdService(item.id))
  if (err) {
    const errMsg = err.message || '服务异常'
    ElMessage.error(errMsg)
    item.loading = false
    searchButtonLoading.value = false
    return
  }
  if (res.length === 0) {
    emptyResultVisible.value = true
    item.loading = false
    return
  }
  searchGmaeResults.value.length = 0
  gameGridResults.value = res.filter((item) => item.width / item.height < 1)
  item.loading = false
}
const chooseGameGrid = (item) => {
  emits('getGameGridUrl', item.url)
  handleDialogCancel()
}
defineExpose({
  dialogInit
})
</script>

<style lang="scss" scoped>
.dialogContent {
  max-height: 60vh;
  overflow: auto;
  &-inputArea {
    display: flex;
    justify-content: space-between;
    &-inputField {
      padding-right: 20px;
    }
  }
  &-searchResultList {
    padding-top: 5px;
    &-button {
      margin: 5px;
    }
  }
  &-gridResultList {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    &-image {
      width: 160px;
      height: 230px;
      border-radius: 5px;
      margin: 10px;
      cursor: pointer;
    }
    &-image:hover {
      transform: scale(110%);
      box-shadow: 0 0 10px 0 rgba($color: #000000, $alpha: 0.8);
      transition: 0.3s linear;
    }
    &-image:not(:hover) {
      transition: 0.3s linear;
    }
  }
}
</style>
