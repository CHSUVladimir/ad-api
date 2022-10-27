export { default as Authorization } from './Authorization';
export {default as UserAD} from './UserAD';

/**
 * @interface Набор адресов для подключения к AD
 */
export interface IADAuthAdress {
  Main: string;
  App: string;
  User: string;
}

export interface IADUsersAdress{
    Adress:string; 
    All:string; 
    Curent:string;
};

/**
 * @interface Данные для подключения к AD
 */
export interface IADAuth {
  Id: string;
  Secret: string;
  User: string;
  IdUser: string;
}

/**
 * @interface Набор адресов для подключения к AD
 */
export interface IADSettings {
  MainAdress: string;
  AuthAdress: IADAuthAdress;
  UserAdress: IADUsersAdress;
}

/**
 * @interface ответа API AD
 */
export interface AppAuthResponse {
  id: string;
  secret: string;
  user: string;
  idUser: string;
  saa: boolean;
}

export interface IUserAD{
  /** Идентификатор */
  id: string;
  /** Фамилия Имя Отчество пользователя*/
  title: string; 
  /**Логин*/
  loginName: string;
  /**Занимаемая должность*/
  post?: string;
  /**Электронная почта*/
  email: string;
  /**Фамилия*/
  firstName: string;
  /**Имя*/
  secondName: string;
  /**Отчество*/
  thirdName: string;
  /**Подразделение в котором работает пользователь*/
  departament?: string;
  /**Является ли текущая персона работником ЧГУ*/
  staff:boolean;
  /**Является ли персона студентом*/
  student:boolean;
  /**Если персона является студентом, то приоритетная группа*/
  studyGroup?:string;
}
