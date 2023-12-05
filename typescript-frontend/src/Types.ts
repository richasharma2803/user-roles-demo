export interface LocalStorageUserType {
    encryptedData: string
    iv: string
}

export interface CurrentUserType {
    token: string
    user: UserDataType
}

export interface UserDataType {
    id?: number
    role_id: string
    first_name: string
    last_name: string
    email: string
    password: string
    country_code: string
    mobile: string
    address: string
    dob: string
    gender: string
    profile: File[]|string
    doc: File[]|string
    hobbies: string[]
    created_at?: string
    updated_at?: string
    is_active?: number
    email_verified_at?: string
    number_of_attempts?: number
    remember_token?: string
    rolePermission?: string[]
    role?: { [key: string]: any }
}

export interface Role {
    id: number;
    role_id: number;
    role_name: string;
    is_active?: number;
    created_at?: string;
    updated_at?: string;
    permission: string[];
};

export interface FormErrorsType {
    [key:string]: string
}