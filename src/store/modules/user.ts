import { defineStore } from 'pinia'
import { createStorage } from '@/utils/Storage'
import { store } from '@/store'
import { ACCESS_TOKEN, CURRENT_DEPT, CURRENT_USER } from '@/store/mutation-types'
import { ResultEnum } from '@/enums/httpEnum'
import { doLogout, getUserInfo, login } from '@/api/system/user'
import { PageEnum } from '@/enums/pageEnum'
import router from '@/router'

const Storage = createStorage({ storage: localStorage })

interface UserInfo {
  userId: string | number
  username: string
  realname: string
  nickname: string
  avatar: string
  cover: string
  gender: number
  phone: string
  sign?: string
  industry?: number
}

interface DeptInfo {
  id: string | number
  parentId: string | number
  ancestors: string | number
  name: string
  sort: number
  leader: string
  phone: string
  email: string
  status: string
  del: string
  creator: string | number
  createdDatetime: string
}

interface IUserState {
  token?: string
  userInfo: Nullable<UserInfo>
  deptInfo: Nullable<DeptInfo>
  lastUpdateTime: number
}

interface LoginParams {
  account: string
  password: string
  grantType?: string
  remember?: string
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    userInfo: null,
    deptInfo: null,
    token: undefined,
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || Storage.get(CURRENT_USER, '') || {}
    },
    getDeptInfo(): DeptInfo {
      return this.deptInfo || Storage.get(CURRENT_DEPT, '') || {}
    },
    getToken(): string {
      return this.token || Storage.get(ACCESS_TOKEN, '')
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
  },
  actions: {
    setToken(token: string | undefined) {
      this.token = token || ''
      Storage.set(ACCESS_TOKEN, token)
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      Storage.set(CURRENT_USER, info)
    },
    setDeptInfo(info: DeptInfo | null) {
      this.deptInfo = info
      Storage.set(CURRENT_DEPT, info)
    },

    async Login(params: LoginParams) {
      try {
        const response = await login(params)
        const { data, code } = response
        if (code === ResultEnum.SUCCESS) {
          // save token
          this.setToken(data.token)
        }
        return Promise.resolve(response)
      }
      catch (error) {
        return Promise.reject(error)
      }
    },

    async GetUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            const tempUser = res.data.user
            const userInfo: UserInfo = {
              userId: tempUser.id,
              username: tempUser.account,
              realname: tempUser.nickname,
              nickname: tempUser.nickname,
              avatar: tempUser.avatar || 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
              cover: tempUser.cover || 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
              gender: tempUser.gender || 0,
              phone: tempUser.phone,
              sign: tempUser.sign || '一年精通三年熟练五年入门',
              industry: tempUser.industry || 4,
            }
            this.setUserInfo(userInfo)
            this.setDeptInfo(res.data.dept)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    async Logout() {
      if (this.getToken) {
        try {
          await doLogout()
        }
        catch {
          console.error('注销Token失败')
        }
      }
      this.setToken(undefined)
      this.setUserInfo(null)
      Storage.remove(ACCESS_TOKEN)
      Storage.remove(CURRENT_USER)
      router.push(PageEnum.BASE_LOGIN)
      location.reload()
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store)
}
