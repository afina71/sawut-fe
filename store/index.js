export const state = () => {
  return {
    auth: null,
    isSidebarOpen: false,
    variables: null,
    isInit: false,
    user: null,
    token: null,
    authenticated: false,
  }
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  deleteUser(state) {
    state.user = null
  },
  toggleSidebar(state, payload) {
    state.isSidebarOpen =
      typeof payload === 'boolean' ? payload : !state.isSidebarOpen
  },
  updateVariables(state, payload) {
    state.variables = payload
  },
  isInitTrue(state) {
    state.isInit = true
  },
  isInitFalse(state) {
    state.isInit = false
  },
  SAVE_TOKEN(state, response) {
    localStorage.setItem('token', response.data.token)
    state.token = response.data.token
    state.authenticated = true
  },
}

export const actions = {
  useAPI(context, { method, url, data, token }) {
    return new Promise((resolve, reject) => {
      this.$axios[method](url, data)
        .then(({ data: response }) => resolve(response.data || response))
        .catch(
          ({
            response: {
              status: statusCode,
              data: { message },
            },
          }) => {
            // eslint-disable-next-line unicorn/error-message
            // reject(new Error({ statusCode, message }))
          }
        )
    })
  },
  // getItems({ dispatch }, payload) {
  //   return dispatch('useAPI', {
  //     method: 'get',
  //     url: `https://laravel-sawut.herokuapp.com/api/${payload}`,
  //   })
  // },
  // createItem({ dispatch }, [url, data]) {
  //   return dispatch('useAPI', {
  //     method: 'post',
  //     url: `https://laravel-sawut.herokuapp.com/api/${url}`,
  //     data,
  //   })
  // },
  // updateItem({ dispatch }, [url, data]) {
  //   return dispatch('useAPI', {
  //     method: 'patch',
  //     url: `https://laravel-sawut.herokuapp.com/api/${url}`,
  //     data,
  //   })
  // },
  // deleteItem({ dispatch }, payload) {
  //   return dispatch('useAPI', {
  //     method: 'delete',
  //     url: `https://laravel-sawut.herokuapp.com/api/${payload}`,
  //   })
  // },
  getItems({ dispatch }, payload) {
    return dispatch('useAPI', {
      method: 'get',
      url: `https://sawut-laravel.herokuapp.com/api/${payload}`,
    })
  },
  createItem({ dispatch }, [url, data]) {
    return dispatch('useAPI', {
      method: 'post',
      url: `https://sawut-laravel.herokuapp.com/api/${url}`,
      data,
    })
  },
  updateItem({ dispatch }, [url, data]) {
    return dispatch('useAPI', {
      method: 'put',
      url: `https://sawut-laravel.herokuapp.com/api/${url}`,
      data,
    })
  },
  deleteItem({ dispatch }, payload) {
    return dispatch('useAPI', {
      method: 'delete',
      url: `https://sawut-laravel.herokuapp.com/api/${payload}`,
    })
  },
  editItem({ dispatch }, payload) {
    return dispatch('useAPI', {
      method: 'put',
      url: `https://sawut-laravel.herokuapp.com/api/${payload}`,
    })
  },

  // auth-related actions
  login(context, payload) {
    return this.dispatch('createItem', ['auth/login', payload])
  },

  // penerimaan wakaf
  getDataWakaf({ dispatch }) {
    return dispatch('getItems', 'wakaf/penerimaan')
  },
  createDataWakaf({ dispatch }, payload) {
    return dispatch('createItem', ['wakaf/penerimaan/create', payload])
  },
  updateDataWakafIndividu({ dispatch }, [id, payload]) {
    return dispatch('updateItem', [`wakaf/penerimaan/${id}`, payload])
  },
  deleteDataWakafIndividu({ dispatch }, id) {
    return dispatch('deleteItem', `wakaf/penerimaan/${id}`)
  },

  // pengelolaan wakaf
  getDataKas({ dispatch }) {
    return dispatch('getItems', 'wakaf/pengelolaan')
  },
  createDataKas({ dispatch }, payload) {
    return dispatch('createItem', ['wakaf/pengelolaan/pindah', payload])
  },

  // penyaluran manfaat
  getDataPenyaluran({ dispatch }) {
    return dispatch('getItems', 'wakaf/penyaluran')
  },
  createDataPenyaluran({ dispatch }, payload) {
    return dispatch('createItem', ['wakaf/penyaluran/create', payload])
  },
  updateDataPenyaluran({ dispatch }, [id, payload]) {
    return dispatch('updateItem', [`wakaf/penyaluran/${id}`, payload])
  },
  deleteDataPenyaluran({ dispatch }, id) {
    return dispatch('deleteItem', `wakaf/penyaluran/${id}`)
  },
  persetujuanPenyaluran({ dispatch }, id) {
    return dispatch('editItem', `wakaf/penyaluran/persetujuan/${id}`)
  },
  penyaluranManfaat({ dispatch }, id) {
    return dispatch('editItem', `wakaf/penyaluran/penyaluran/${id}`)
  },
  inputCreditScoringSatu({ dispatch }, [id, payload]) {
    return dispatch('createItem', [`wakaf/penyaluran/input-2/${id}`, payload])
  },
  inputCreditScoringDua({ dispatch }, [id, payload]) {
    return dispatch('createItem', [`wakaf/penyaluran/input-3/${id}`, payload])
  },

  // pengajuan biaya
  getDataPengajuan({ dispatch }) {
    return dispatch('getItems', 'wakaf/pengajuan')
  },
  createDataPengajuan({ dispatch }, payload) {
    return dispatch('createItem', ['wakaf/pengajuan/create', payload])
  },
  updateDataPengajuan({ dispatch }, [id, payload]) {
    return dispatch('updateItem', [`wakaf/pengajuan/${id}`, payload])
  },
  deleteDataPengajuan({ dispatch }, id) {
    return dispatch('deleteItem', `wakaf/pengajuan/${id}`)
  },
  editDataPengajuan({ dispatch }, id) {
    return dispatch('editItem', `wakaf/pengajuan/persetujuan/${id}`)
  },
  pencairanDataPengajuan({ dispatch }, id) {
    return dispatch('editItem', `wakaf/pengajuan/pencairan/${id}`)
  },

  // pelunasan piutang
  getDataPelunasan({ dispatch }) {
    return dispatch('getItems', 'wakaf/pelunasan')
  },
  createDataPelunasan({ dispatch }, payload) {
    return dispatch('createItem', ['wakaf/pelunasan/create', payload])
  },
  updateDataPelunasanIndividu({ dispatch }, [id, payload]) {
    return dispatch('updateItem', [`wakaf/pelunasan/${id}`, payload])
  },
  deleteDataPelunasanIndividu({ dispatch }, id) {
    return dispatch('deleteItem', `wakaf/pelunasan/${id}`)
  },

  // data aset tetap
  getDataAsetTetap({ dispatch }) {
    return dispatch('getItems', 'wakaf/data-aset-tetap')
  },
  createDataAsetTetap({ dispatch }, payload) {
    return dispatch('createItem', ['wakaf/data-aset-tetap/create', payload])
  },
  updateDataAsetTetap({ dispatch }, [id, payload]) {
    return dispatch('updateItem', [`wakaf/data-aset-tetap/${id}`, payload])
  },
  deleteDataAsetTetap({ dispatch }, id) {
    return dispatch('deleteItem', `wakaf/data-aset-tetap/${id}`)
  },

  // data utang
  getDataUtang({ dispatch }) {
    return dispatch('getItems', 'wakaf/data-utang')
  },
  createDataUtang({ dispatch }, payload) {
    return dispatch('createItem', ['wakaf/data-utang/create', payload])
  },
  updateDataUtang({ dispatch }, [id, payload]) {
    return dispatch('updateItem', [`wakaf/data-utang/${id}`, payload])
  },
  deleteDataUtang({ dispatch }, id) {
    return dispatch('deleteItem', `wakaf/data-utang/${id}`)
  },

  // data akun
  getDataAkun({ dispatch }) {
    return dispatch('getItems', 'wakaf/data-akun')
  },
  updateDataAkun({ dispatch, payload }) {
    return dispatch('editItem', 'wakaf/data-akun', payload)
  },

  // data pengguna
  getDataPengguna({ dispatch }) {
    return dispatch('getItems', 'wakaf/daftar-pengguna')
  },
  createDataPengguna({ dispatch }, payload) {
    return dispatch('createItem', ['wakaf/daftar-pengguna/create', payload])
  },
  updateDataPengguna({ dispatch }, [id, payload]) {
    return dispatch('updateItem', [`wakaf/daftar-pengguna/${id}`, payload])
  },
  deleteDataPengguna({ dispatch }, id) {
    return dispatch('deleteItem', `wakaf/daftar-pengguna/${id}`)
  },
}
