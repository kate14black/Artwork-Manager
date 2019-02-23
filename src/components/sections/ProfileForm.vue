<template>
  <div
    v-if="isAfterMount"
    id="profile-form"
  >
    <h3>{{ this.$route.path === '/sign-up' ? 'Sign Up' : 'Edit Profile' }}</h3>
    <v-form v-model="valid">
      <v-container>
        <v-layout>
          <v-flex
            xs12
            md12
          >
          <v-text-field
            v-model="user.firstName"
            :rules="nameRules"
            :counter="10"
            label="First name"
            name="firstname"
            required
          />
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex
              xs12
              md12
            >
            <v-text-field
              v-model="user.lastName"
              :rules="nameRules"
              :counter="10"
              label="Last name"
              name="lastname"
              required
            />
            </v-flex>
        </v-layout>
        <v-layout>
          <v-flex
            xs12
            md12
          >
          <v-text-field
            v-model="user.email"
            :rules="emailRules"
            label="E-mail"
            @input="setAvatar"
            name="email"
            required
          />
          </v-flex>
        </v-layout>
        <div>
          <label class="warning-label">Please fill all fields.</label>
          <v-btn
            depressed
            small
            color="primary"
            type="button"
            value="Submit"
            @click="submitProfileToTheBlockchain"
          >Submit
          </v-btn>
        </div>
      </v-container>
    </v-form>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'ProfileForm',
  data: function () {
    return {
      valid: false,
      user: this.$store.state.user,
      isAfterMount: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  computed: {
    isDAppReady: function () {
      return this.$store.state.isDAppReady
    }
  },
  watch: {
    isDAppReady: function (value) {
      console.log('isDAppReady: ', value);
      this.$nextTick(function () {
        this.loadProfileFormOrPage()
      })
    },
    isAfterMount: function (value) {
      console.log('isAfterMount: ', value);
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
      const email = evt && evt.target && evt.target.value !== undefined ? evt.target.value.trim() : this.user.email.trim();
    },
    submitProfileToTheBlockchain (evt) {
      if (this.user.firstName.trim() === '' || this.user.lastName.trim() === '' || this.user.email.trim() === '') {
        document.querySelector('.warning-label').style.display = 'inline-block';
      } else {
        document.querySelector('.warning-label').style.display = 'none';
        evt.target.disabled = true;
        const action = this.$route.path === '/sign-up' ? 'signup' : 'editProfile';
        const userObject = {
          firstName: `b${this.user.firstName || ''}`,
          lastName: `b${this.user.lastName || ''}`,
          email: `b${this.user.email || ''}`,
        };

        const vueUserObject = Object.assign({}, userObject, {
          firstName: this.user.firstName || '',
          lastName: this.user.lastName || '',
          email: this.user.email || '',
        });

        this.$root.callToWriteUser({
          vueObject: vueUserObject,
          requestParams: userObject,
          contractIndexToUse: 'UserAuthManager',
          methodName: 'setUser',
          managerIndex: 'UserManager',
          callback: (userData = null) => {
            evt.target.disabled = false;
            console.log(action === 'signup' ? 'Signed up and logged In' : 'Successfully updated profile');
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
        this.isAfterMount = true;
        this.setAvatar()
      } else {
        this.$root.callToAccessBlockchain({
          requestParams: {},
          contractIndexToUse: 'UserAuthManager',
          methodName: 'login',
          managerIndex: 'UserManager',
          callback: (isUserExists = false) => {
            if (isUserExists) {
              this.$root.logUserIn();
            } else {
              this.isAfterMount = true;
              this.setAvatar();
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
