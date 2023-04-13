import { Context } from "telegraf"

export interface ISessionData {
    isLike: boolean
}

export interface IBotContext extends Context {
    session: ISessionData
}