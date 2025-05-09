<template>
  <div class="container">
    <div class="header">
      <h2>Управление учетными записями</h2>
      <el-button
        type="primary"
        icon="Plus"
        @click="addAccount"
        circle 
        style="width: 48px; height: 48px; font-size: 20px"
      >
      </el-button>
    </div>

    <div class="clue"> 
      <h3>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</h3>
    </div>

    <AccountsList />
  </div>
</template>


<script setup lang="ts">
import { useAccountsStore } from './stores/accounts'
import AccountsList from './views/AccountsList.vue'

const store = useAccountsStore()

const addAccount = () => {
  const hasInvalid = store.accounts.some(account => {
    const isLoginValid = account.login.trim().length > 0
    const isPasswordValid = 
      account.type === 'Локальная'
        ? account.password !== null && account.password.trim().length > 0
        : true

    return !(isLoginValid && isPasswordValid)
  })

  if (hasInvalid) {
    store.accounts = store.accounts.map(account => ({
      ...account,
      validated: true
    }))
    return 
  }

  store.addAccount()
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, Helvetica, sans-serif;
}

.header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 15px;
  background-color: rgb(224, 224, 224);
}

.clue {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  
  background-color: rgb(235, 247, 255);

  padding: 2px 8px;
  border-radius: 8px;
  margin: 0 10px 20px 10px;
}
</style>

