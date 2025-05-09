<template>
  <div class="accounts_list" v-if="!!accounts.length">
    <div class="list_header">
      <h2>Метка</h2>
      <h2>Тип записи</h2>
      <h2>Логин</h2>
      <h2>Пароль</h2>
    </div>

    <AccountCard
      v-for="account in accounts"
      :key="account.id"
      :account="account"
      @update="updateAccount"
      @remove="removeAccount"
    />
  </div>
  <h2 
    v-else
    style="display: flex; justify-content: center;"
  >Список учетных записей пуст.</h2>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAccountsStore } from '../stores/accounts'
import AccountCard from '../components/AccountsCard.vue'
import type { Account } from '../types'


const store = useAccountsStore()

const accounts = computed(() => store.accounts)


const removeAccount = (id: string) => store.removeAccount(id)
const updateAccount = (account: Account) => store.updateAccount(account)
</script>

<style scoped>
.accounts_list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.list_header {
  display: flex;
  padding: 0 20px;
  gap: 5px;
}

.list_header h2 {
  font-size: 16px;
  width: 200px;
  color: rgb(156, 156, 156);
}
</style>
