import { IADAuth, IADSettings, AppAuthResponse } from '.';
import fetch from 'cross-fetch';

/**
 * @class отвечающий за авторизацию
 */
export default class Authorization {
  /**
   * Идентификатор приложения
   */
  private static APPId: string = '';
  /**
   * @writeonly Установка идентификатора приложения
   */
  public static set AppId(v: string) {
    this.APPId = v;
  }

  /**
   * Пароль подключения к API
   */
  private static APPSecret: string;
  /**
   * @writeonly Установка Пароля подключения к API
   */
  public static set AppSecret(v: string) {
    this.APPSecret = v;
  }

  /**
   * Пользователь подключающийся к API
   */
  private static UserName: string;
  /**
   * @writeonly Установка Пользователя для подключения к API
   */
  public static set User(v: string) {
    this.UserName = v;
  }

  /**
   * Иденитфикатор пользователя для обращения к API
   */
  private static UserId: string;
  /**
   * @writeonly Установка Иденитфикатора для подключения к API
   */
  public static set IdUser(v: string) {
    this.UserId = v;
  }

  /**
   * Идентификатор ссесии для подключения к API
   */
  private static idSession?: string;
  /**
   * @readonly Идентификатор ссесии для подключения к API
   */
  public static get SessionId(): string | undefined {
    return this.idSession;
  }

  /**
   * Произведена ли авторизация приложения
   */
  private static AppAuthorized: boolean = false;

  /**
   * @readonly Данные для атентификации
   */
  private static get adAuth(): IADAuth {
    const res: IADAuth = {
      Id: this.APPId,
      Secret: this.APPSecret,
      User: this.UserName,
      IdUser: this.UserId
    };

    return res;
  }

  /**
   * @async метод авторизации
   * @param {IADSettings} settings Набор адресов для подключения к API
   */
  public static async Authorize(settings: IADSettings): Promise<void> {
    if (!global.fetch) {
      global.fetch = fetch;
    }
    if (this.AppAuthorized) {
      await this.AuthorizeUser(settings);
    } else {
      await this.AuthorizeApp(settings);
      await this.AuthorizeUser(settings);
    }
  }

  /**
   * Сброс авторизации
   */
  public static Reset(){
    this.AppAuthorized=false;
  }

  /**
   * @async метод авторизации приложения
   * @param {IADSettings} settings Набор адресов для подключения к API
   */
  private static async AuthorizeApp(settings: IADSettings): Promise<void> {
    const APPurl = settings.MainAdress + settings.AuthAdress.Main + settings.AuthAdress.App;
    if (!global.fetch) {
      global.fetch = fetch;
    }
    const AppAuth: AppAuthResponse = await global.fetch(APPurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.adAuth)
      })
      .then((r) => r.json());
    if (AppAuth.saa) {
      this.AppAuthorized = true;
    } else {
      throw new Error('Authorisation APP Failed!');
    }
  }

  /**
   * @async метод авторизации пользователя
   * @param {IADSettings} settings Набор адресов для подключения к API
   */
  private static async AuthorizeUser(settings: IADSettings): Promise<void> {
    if (!global.fetch) {
      global.fetch = fetch;
    }
    if (this.AppAuthorized) {
      const Userurl = settings.MainAdress + settings.AuthAdress.Main + settings.AuthAdress.User;
      const session: { sessionId?: string } = await global.fetch(Userurl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.adAuth)
        })
        .then((resp) => resp.json());
      if (session.sessionId) {
        this.idSession = session.sessionId;
      } else {
        throw new Error('Authorisation User Failed!');
      }
    } else {
      await this.AuthorizeApp(settings);
      if (this.AppAuthorized) {
        this.AuthorizeUser(settings);
      }
    }
  }
}
