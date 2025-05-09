<template>
    <el-card>
        <el-form class="account_form" :model="account">
            <!-- метка -->
            <el-form-item>
                <el-input
                    v-model="account.labelsInput"
                    placeholder="Введите метки через точку с запятой"
                    maxlength="50"
                    @blur="handleBlur"
                    clearable
                >
                </el-input>
            </el-form-item>

            <!-- тип записи -->
            <el-form-item>
                <el-select
                    v-model="account.type"
                    @change="handleTypeChange"
                >
                    <el-option label="LDAP" value="LDAP" />
                    <el-option label="Локальная" value="Локальная" />
                </el-select>
            </el-form-item>

            <!-- логин -->
             <el-form-item
                required
                :class="{ 'is-error': !account.login && account.validated }"
            >
                <el-input
                    v-model="account.login"
                    placeholder="Введите логин"
                    maxlength="100"
                    @blur="validate"
                    clearable
                />
            </el-form-item>

            <!-- пароль -->
            <el-form-item
                required
                :class="{'is-error': !account.password && account.validated}"
            >
                <el-input
                    v-model="account.password"
                    type="password"
                    placeholder="Введите пароль"
                    maxlength="100"
                    @blur="validate"
                    show-password
                    :disabled="account.type !== 'Локальная'"
                />
            </el-form-item>
            <el-button
                type="danger"
                icon="Delete"
                @click="$emit('remove', account.id)"
                circle
            />
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import type { Account } from '../types'
import type { AccountType } from '../types'

const props = defineProps<{
    account: Account
}>()

const emit = defineEmits(['update', 'remove'])

const handleBlur = () => {
  const raw = props.account.labelsInput || ''
  const labelsArray = raw
    .replace(/\s+/g, ';')    
    .split(';')               
    .map(label => label.trim()) 
    .filter(Boolean)          

  emit('update', {
    ...props.account,
    labelsInput: labelsArray.join(';'), 
    labels: labelsArray.map(text => ({ text }))
  })
}

const handleTypeChange = (type: AccountType) => {
    const updatedAccount = {
        ...props.account,
        type,
        password: type === 'Локальная' ? '' : null
    }
    emit('update', updatedAccount)
}

const validate = () => {
    const updatedAccount = {
        ...props.account,
        validated: true
    }
    emit('update', updatedAccount)
}
</script>

<style scoped>
.el-card {
    margin-bottom: 10px;
}
.account_form {
    display: flex;
    align-items: center;
    gap: 5px;
}

.card_header {
    display: flex;
    gap: 20px;
    align-items: center;
}

.is-error :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--el-color-danger) inset;
}

.el-select-dropdown__item {
    font-family: 'YourFont', sans-serif;
    font-size: 14px;
    color: #333;
}

.el-form-item {
    margin-bottom: 0 !important;
    padding: 0 !important;
}

.el-input,
.el-select {
    width: 200px;
}
</style>