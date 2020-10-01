import Vue from 'vue';

export const alertsModule = {
    namespaced: true,
    state: {
        type: '',
        message: '',

    },
    getters: {
        alertType: state => state.type,
        alertMessage: state => state.message,
    },
    mutations: {
        setAlertType (state, payload) {
            state.type = payload.type
            state.message = payload.message
        },
        clearAlert (state) {
            state.type = ''
            state.message = ''
        },

    },

    actions: {
        turnOnAlert({commit}, data) {
            //commit('setAlertType', data);
            if(data && data.type == "success"){
                Vue.notify({
                    group: 'app',
                    type: "success",
                    title: 'Success',
                    text: data.message
                  })
            }
            else if(data && data.type == "error"){
                Vue.notify({
                    group: 'app',
                    type: "error",
                    title: 'Error',
                    text: data.message
                  });
            }
        },
        turnOffAlert({commit}) {
            commit('clearAlert')
        }

    }

}