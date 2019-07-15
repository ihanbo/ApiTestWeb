<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

    import * as types from './store/types'

    export default {
        name: 'app',
        data() {
            return {}
        },
        methods: {
          checkIn(userAccount,userName,fakeTk) {
                console.log(userAccount+'  '+userName+' '+fakeTk)
                this.$axios.post(this.$api.checkInApi, {
                    'user_name': userName,
                    'user_account': userAccount,
                    'fake_tk': fakeTk,
                }).then((response) => {
                        console.log('response---->'+response.data['token']+response.data['name'])
                        this.$store.commit(types.LOGIN, response.data['token']);
                        this.$store.commit(types.ROLES, response.data['roles']);
                        this.$store.commit('roles', response.data['roles']);
                        this.$store.commit(types.USERNAME, response.data['name']);
                        this.$store.commit('userName', response.data['name']);

                        // let redirect = decodeURIComponent(this.$route.query.redirect || '/manage/projectManage');
                        // this.$router.push({path: redirect})
                    }
                );

            },

        },
        mounted() {
          var userStr = window.localStorage.getItem('userData')
          if(!userStr){
              userStr = '{"jwt":"eyJ0eXAiOiJK","user":{"userName":"hanbo4","trueName":"韩波3(架构创新组)","userId":8066},"modules":[]}'
          }
       
          console.log('localstorage-->'+userStr)
          var userData = JSON.parse(userStr)
          this.checkIn(userData.user.userName,userData.user.trueName,userData.jwt)
        },

    }
</script>

<style>
  .scrollbarList {
    max-height: 700px;
  }
</style>
