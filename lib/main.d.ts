import { Context } from 'egg';

declare var Ctx = Context
declare interface ApiResult {
  code: number
  msg?: string
  data: any
}