
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/business/ruralSubscribe
  * summary: 新增订阅
 * tags: 订阅管理
 */
let apiBusinessRuralSubscribe_Body = {
      typeId: null,   /** 业务ID   number required: */
      remark: null,   /** 备注   string required: */
      type: null,   /** 业务类型(1:留言，2:名片，3:资讯，4:坐标，5:图集，6:好物，7:路线，8:管理员)   number required: */
    }
    
export function apiBusinessRuralSubscribe_Post(   apiBusinessRuralSubscribe_Body) {
    return request({
         url:`/api/business/ruralSubscribe`,
         method:'post',
                      
                 data: apiBusinessRuralSubscribe_Body
    })
}
/**  =========================================================================== ***/
