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
  getDataWakafIndividu({ dispatch }, [id, payload]) {
    return dispatch('getItems', [`wakaf/penerimaan/${id}/edit`, payload])
  },
  updateDataWakafIndividu({ dispatch }, [id, payload]) {
    return dispatch('updateItems', [`wakaf/penerimaan/${id}`, payload])
  },
  deleteDataWakafIndividu({ dispatch }, [id, payload]) {
    return dispatch('deleteItem', `wakaf/penerimaan/${id}`, payload)
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
    return dispatch('getItems', 'wakaf/penyaluran/')
  },

  // pengajuan biaya
  getDataPengajuan({ dispatch }) {
    return dispatch('getItems', 'wakaf/pengajuan/')
  },

  // pelunasan piutang
  getDataPelunasan({ dispatch }) {
    return dispatch('getItems', 'wakaf/pelunasan/')
  },

  // data aset tetap
  getDataAsetTetap({ dispatch }) {
    return dispatch('getItems', 'wakaf/data-aset-tetap/')
  },

  // createUser({ dispatch }, [body, query]) {
  //   const qs = new URLSearchParams(query).toString()
  //   return dispatch('createItem', [`signup?${qs}`, body])
  // },

  // teacher-dashboard
  // getClassTeacherById({ dispatch }, userId) {
  //   return dispatch('getItems', [`teacher/${userId}`])
  // },
  // createClass({ dispatch }, payload) {
  //   return dispatch('createItem', ['teacher', payload])
  // },
  // getClassTeacherDetail({ dispatch }, classId) {
  //   return dispatch('getItems', [`teacher/class/${classId}`])
  // },
  // deleteClassTeacher({ dispatch }, payload) {
  //   return dispatch('deleteItem', `teacherclass/${payload}`)
  // },
  // updateClassTeacher({ dispatch }, [classId, data]) {
  //   return dispatch('updateItem', [`teacher/${classId}`, data])
  // },

  // // student-dashboard
  // getAllClass({ dispatch }) {
  //   return dispatch('getItems', 'student')
  // },
  // joinClass({ dispatch }, [userId, data]) {
  //   return dispatch('updateItem', [`student/${userId}`, data])
  // },
  // checkClass({ dispatch }, payload) {
  //   return dispatch('createItem', ['student', payload])
  // },
  // getClassStudentDetail({ dispatch }, classId) {
  //   return dispatch('getItems', [`student/class/${classId}`])
  // },
  // getClassStudentById({ dispatch }, userId) {
  //   return dispatch('getItems', [`student/${userId}`])
  // },
  // deleteStudentFromClass({ dispatch }, { classId, userId }) {
  //   return dispatch('deleteItem', `teacher/${classId}/${userId}`)
  // },
}
