// Тип для метки (label)
interface Label {
    text: string
}

// Типы для вида учетной записи
type AccountType = 'LDAP' | 'Локальная'

// Основной интерфейс учетной записи
interface Account {
    id: string                 
    labelsInput: string          
    labels: Label[]             
    type: AccountType            
    login: string                
    password: string | null      
    validated: boolean          
}

export type { Label, AccountType, Account }