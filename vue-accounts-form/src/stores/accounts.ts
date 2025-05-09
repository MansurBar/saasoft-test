import { defineStore } from 'pinia'
import type { Account } from '../types/index'

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: JSON.parse(localStorage.getItem('accounts') || '[]') as Account[], 
  }),
  actions: {
    addAccount() {
      this.accounts.push({
        id: Date.now().toString(),
        labelsInput: '',
        labels: [],
        type: 'Локальная',
        login: '',
        password: '',
        validated: false
      })
      this.saveAccountsToLocalStorage()
    },
    removeAccount(id: string) {
      this.accounts = this.accounts.filter(account => account.id !== id)
      this.saveAccountsToLocalStorage()
    },
    updateAccount(updatedAccount: Account) {
      const index = this.accounts.findIndex(a => a.id === updatedAccount.id)
      if (index !== -1) {
        this.accounts[index] = updatedAccount
        this.saveAccountsToLocalStorage()
      }
    },
    saveAccountsToLocalStorage() {
      localStorage.setItem('accounts', JSON.stringify(this.accounts))
    }
  }
})