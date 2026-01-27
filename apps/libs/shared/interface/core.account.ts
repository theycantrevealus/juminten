export interface IUserLocales {
  id: string
  code: string
  name: string
  image_url: string
  status: string
  time: string
  __v: number
}

export interface IUserCurrencies {
  id: string
  code: string
  name: string
  image_url: string
  status: string
  time: string
  __v: number
}

export interface IUserProfile {
  id: string
  username: string
  firstname: string
  lastname: string
  job_title: string
  job_level: string
  identification: {
    employee_no: string
  }
  phone: string
  email: string
  image_url: string | null
  status: string
  last_access_time: string
  role_id: string
  __v: number
}

export interface IAuthorizes {
  object_code: string
  action_codes: string[]
}

export interface IUser {
  user_profile: IUserProfile
  authorizes: IAuthorizes[]
  locales: IUserLocales[]
  currencies: IUserCurrencies[]
}
