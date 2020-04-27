<template>
  <div class="users-page">
    <h1>Users page</h1>
    <div class="users-page__list">
      <div
        class="users-page__item"
        v-for="user in users"
        :key="user.email"
        @click="goToUser(user)"
      >
        <img
          class="users-page__item-avatar"
          :src="user.avatar"
          alt="user avatar"
        />
        <div class="users-page__item-desc">
          <div>{{ user.first_name }} {{ user.last_name }}</div>
          <div>{{ user.email }}</div>
        </div>
      </div>
    </div>
    <div class="users-page__select">
      <button :disabled="pagination.page === 1" @click="prevPage">prev</button>
      <select
        name="select"
        id="select"
        v-model="selectedOption"
        @input="getUsers('reset')"
      >
        <option v-for="option in selectOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <button
        :disabled="pagination.page * pagination.per_page > total"
        @click="nextPage"
      >
        next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectOptions: [5, 10, 20]
    }
  },
  watch: {
    selectedOption(val) {
      console.log(val)
    }
  },
  computed: {
    users() {
      return this.$store.state.users
    },
    selectedOption: {
      get() {
        return this.$store.state.pagination.per_page
      },
      set(val) {
        this.$store.commit('SET_PAGINATION', {
          key: 'per_page',
          value: Number(val)
        })
      }
    },
    pagination() {
      return this.$store.state.pagination
    },
    total() {
      return this.$store.state.total
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    async getUsers(data) {
      if (data && data === 'reset') {
        await this.$store.commit('SET_PAGINATION', {
          key: 'page',
          value: 1
        })
      }
      this.$store.dispatch('getUsers')
    },
    nextPage() {
      this.$store.commit('SET_PAGINATION', {
        key: 'page',
        value: this.pagination.page + 1
      })
      this.getUsers()
    },
    prevPage() {
      this.$store.commit('SET_PAGINATION', {
        key: 'page',
        value: this.pagination.page - 1
      })
      this.getUsers()
    },
    goToUser(user) {
      console.log(user)
      this.$router.push({
        name: 'User',
        params: user
      })
    }
  }
}
</script>

<style lang="scss">
h1 {
  color: black;
}
.users-page {
  &__list {
    width: 80%;
    margin: 20px auto;
  }
  &__item {
    display: flex;
    background: #ffffff;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
    padding: 20px;
    margin: 5px;
    width: 400px;
    &:hover {
      cursor: pointer;
    }
  }
  &__item-desc {
    padding: 0 20px;
    text-align: left;
  }
}
</style>
