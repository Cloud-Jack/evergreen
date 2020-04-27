<template>
  <div class="user-page">
    <h1>User page</h1>
    <div class="user-page__card">
      <h3>{{ user.first_name }} {{ user.last_name }}</h3>
      <div>{{ user.email }}</div>
      <img class="user-page__avatar" :src="user.avatar" alt="user avatar" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      required: true
    }
  },
  created() {
    console.log(this.user)
  }
}
</script>

<style lang="scss">
h1 {
  color: black;
}
.user-page {
  display: flex;
  align-items: center;
  flex-direction: column;
  &__card {
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
    padding: 20px;
    margin: 5px;
  }
  &__avatar {
    width: 128px;
    height: 128px;
    margin: 20px;
  }
}
</style>
