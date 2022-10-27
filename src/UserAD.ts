import fetch from 'cross-fetch';
import { Authorization, IADSettings, IUserAD } from '.';

export default class UserAD implements IUserAD{
    public id: string;
    public title: string;
    public loginName: string;
    public post?: string | undefined;
    public email: string;
    public firstName: string;
    public secondName: string;
    public thirdName: string;
    public departament?: string | undefined;
    public staff: boolean;
    public student: boolean;
    public studyGroup?: string | undefined;

    /**
     * Простой инициализатор
     */
    constructor()
    /**
     * Инициализатор на базе интерфейса
     * @param {IUserAD} model набор данных инициализации модели
     */
    constructor(model:IUserAD)
    constructor(model?:IUserAD){
        if(model){
            this.id=model.id;
            this.title=model.title;
            this.loginName=model.loginName;
            this.email=model.email;
            this.firstName=model.firstName;
            this.secondName=model.secondName;
            this.thirdName=model.thirdName;
            this.staff=model.staff;
            this.student=model.student;
            this.post=model.post;
            this.departament=model.departament;
            this.studyGroup=model.studyGroup;
        }else{
            this.id='';
            this.title='';
            this.loginName='';
            this.email='';
            this.firstName='';
            this.secondName='';
            this.thirdName='';
            this.staff=false;
            this.student=false;
        }
    }

    /**
     * Набор всех пользователей зарегестированных в системе
     */
    private static buffer:UserAD[];
    /** набор настроек для подключения */
    private static settings:IADSettings;
    /**
     * @writeonly {IADSettings} v Установка настроек к подключению
     */
    public static set Settings(v:IADSettings){
        this.settings=v;
    }

    /**
     * @async метод получения данных всех пользователей
     * @param {boolean|undefined} force принудительное получение данных с сервера при наличии значения и при равном true
     * @returns {Promise<UserAD[]>} ожидание массива всех пользователей
     */
    public static async GetAll(force?:boolean):Promise<UserAD[]>{
        if (!global.fetch) {
            global.fetch = fetch;
        }
        if(!force){
            if(this.buffer && this.buffer.length>0){
                return this.buffer;
            }else{
                return await this.forceGetAll();
            }
        }else{
            return await this.forceGetAll();
        }
        
        
    }

    /**
     * @async метод принудительного получения данных всех пользователей
     * @returns {Promise<UserAD[]>} ожидание массива всех пользователей от сервера
     */
    private static async forceGetAll():Promise<UserAD[]>{        
        if(!Authorization.SessionId){
            await Authorization.Authorize(this.settings);
        }
        if(Authorization.SessionId){
            const url=this.settings.MainAdress+this.settings.UserAdress.Adress +this.settings.UserAdress.All;
            const sid = Authorization.SessionId;
            const res = await global.fetch(url,{
                method: 'POST',
                   headers: {
                     'Content-Type': 'application/json'
                   },
                   body: JSON.stringify(sid)
             }).then(resp=>resp.json());             
             if(res.length && res.push){
                this.buffer=[];
                const arr =res as IUserAD[];
                arr.sort((a,b)=>{
                    if(a.title>b.title){return 1;}else if(a.title==b.title){return 0;}else{return -1;}
                }).forEach(u=>{
                    this.buffer.push(new UserAD(u));
                });
                return this.buffer;
             }else{
                this.buffer=[];
                this.buffer.push(new UserAD(res));
                return this.buffer;
             }

        }else{
            throw new Error("Authorization Fail!");
        }
    }

    /**
     * Все пользователи ранее полученные с сервера
     */
    public static get All():UserAD[]{
        return this.buffer;
    }
}

