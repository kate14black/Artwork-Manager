<template>
  <div
    v-if="isAfterMount"
    id="profile-form"
  >
    <h3>{{ this.$route.path === '/sign-up' ? 'Sign Up' : 'Edit Profile' }}</h3>
    <div class="wrapper">
      <div class="column">
        <div class="row">
          <label for="first-name">First name</label>
          <input
            id="first-name"
            v-model="user.firstName"
            type="text"
            name="first-name"
          >
        </div>

        <div class="row">
          <label for="last-name">Last name</label>
          <input
            id="Last-name"
            v-model="user.lastName"
            type="text"
            name="Last-name"
          >
        </div>

        <div class="row">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="user.email"
            type="text"
            name="email"
            @input="setAvatar"
          >
        </div>

        <div class="row">
          <label class="warning-label">Please fill all fields.</label>
          <input
            type="button"
            value="Submit"
            @click="submitProfileToTheBlockchain"
          >
        </div>
      </div>

      <div class="avatar-column">
        <div class="avatar" />
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'ProfileForm',
  data: function () {
    return {
      user: this.$store.state.user,
      isAfterMount: false
    }
  },
  computed: {
    isDAppReady: function () {
      return this.$store.state.isDAppReady
    }
  },
  watch: {
    isDAppReady: function (value) {
      console.log('isDAppReady: ', value)
      this.$nextTick(function () {
        this.loadProfileFormOrPage()
      })
    },
    isAfterMount: function (value) {
      console.log('isAfterMount: ', value)
      this.$nextTick(function () {
        this.setAvatar()
      })
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.loadProfileFormOrPage()
    })
  },
  methods: {
    ...mapActions([
      ACTION_TYPES.LOGIN
    ]),
    setAvatar (evt = null) {
      const email = evt && evt.target && evt.target.value !== undefined ? evt.target.value.trim() : this.user.email.trim()
      this.$root.callUpdateUserGravatar({
        email: email,
        callback: (avatarCanvas) => {
          this.styleAndAddAvatarCanvasToPage(avatarCanvas)
        }
      })
    },
    styleAvatarCanvas (avatarCanvas) {
      if (avatarCanvas && avatarCanvas.style) {
        avatarCanvas.style.borderRadius = '104px'
      }
    },
    addAvatarCanvasToPage (avatarCanvas) {
      const avatarContainer = document.querySelector('.avatar')
      if (avatarContainer && avatarCanvas && avatarCanvas.style) {
        const formerCanvas = avatarContainer.querySelector('canvas')
        if (formerCanvas) {
          avatarContainer.replaceChild(avatarCanvas, formerCanvas)
        } else {
          avatarContainer.appendChild(avatarCanvas)
        }
      }
    },
    styleAndAddAvatarCanvasToPage (avatarCanvas) {
      this.styleAvatarCanvas(avatarCanvas)
      this.addAvatarCanvasToPage(avatarCanvas)
    },
    submitProfileToTheBlockchain (evt) {
      if (this.user.firstName.trim() === '' || this.user.lastName.trim() === '' || this.user.email.trim() === '') {
        document.querySelector('.warning-label').style.display = 'inline-block'
      } else {
        document.querySelector('.warning-label').style.display = 'none'
        evt.target.disabled = true
        const action = this.$route.path === '/sign-up' ? 'signup' : 'editProfile'
        const userObject = {
          firstName: `b${this.user.firstName || ''}`,
          lastName: `b${this.user.lastName || ''}`,
          email: `b${this.user.email || ''}`,
          gravatar: `b${this.user.gravatar || ''}`
        }

        const vueUserObject = Object.assign({}, userObject, {
          firstName: this.user.firstName || '',
          lastName: this.user.lastName || '',
          email: this.user.email || '',
          gravatar: this.user.gravatar || ''
        })

        this.$root.callToWriteUser({
          vueObject: vueUserObject,
          requestParams: userObject,
          contractIndexToUse: 'UserAuthManager',
          methodName: 'setUser',
          managerIndex: 'UserManager',
          callback: (userData = null) => {
            evt.target.disabled = false
            console.log(action === 'signup' ? 'Signed up and logged In' : 'Successfully updated profile')
            if (this.user.email === '' || !this.user.isLoggedIn) {
              this.$router.push('/')
            } else {
              this.$router.push('/dashboard')
            }
          }
        })
      }
    },
    loadProfileFormOrPage () {
      if (this.$store.state.currentRoute.name === 'ProfileEdit') {
        this.isAfterMount = true
        this.setAvatar()
      } else {
        this.$root.callToAccessBlockchain({
          requestParams: {},
          contractIndexToUse: 'UserAuthManager',
          methodName: 'login',
          managerIndex: 'UserManager',
          callback: (isUserExists = false) => {
            if (isUserExists) {
              this.$root.logUserIn()
            } else {
              this.isAfterMount = true
              this.setAvatar()
            }
          }
        })
      }
    }
  }
}

import { mapActions } from 'vuex'
import { ACTION_TYPES } from '../../util/constants'
</script>