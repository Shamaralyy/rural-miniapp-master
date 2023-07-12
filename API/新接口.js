
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/business/new/qrCode
  * summary: 获取 获取二维码
 * tags: 新接口
 */
let apiBusinessNewQrCode_Param = {
     path: null,   /** 页面 不要以 /开头    string required:false */
   }
    
export function apiBusinessNewQrCode_Get( apiBusinessNewQrCode_Param    ) {
    return request({
         url:`/api/business/new/qrCode`,
         method:'get',
                     params:apiBusinessNewQrCode_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/new/collect
  * summary: 收藏接口
 * tags: 新接口
 */
let apiBusinessNewCollect_Param = {
     typeId: null,   /** 1名片 2咨询 3服务 4图集    string required:false */
     target: null,   /**     string required:false */
   }
    
export function apiBusinessNewCollect_Post( apiBusinessNewCollect_Param    ) {
    return request({
         url:`/api/business/new/collect`,
         method:'post',
                     params:apiBusinessNewCollect_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/new/collect-list
  * summary: 分页查询我的收藏列表
 * tags: 新接口
 */
let apiBusinessNewCollectlist_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiBusinessNewCollectlist_Body = {
      targetId: null,   /** 目标id   integer required: */
      typeId: null,   /** 收藏类型=1名片,2咨询,.....   integer required: */
    }
        
export function apiBusinessNewCollectlist_Post( apiBusinessNewCollectlist_Param  , apiBusinessNewCollectlist_Body) {
    return request({
         url:`/api/business/new/collect-list`,
         method:'post',
                     params:apiBusinessNewCollectlist_Param ,
                 data: apiBusinessNewCollectlist_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/new/get-token
  * summary: 获取 access_token
 * tags: 新接口
 */
    
export function apiBusinessNewGettoken_Post(   ) {
    return request({
         url:`/api/business/new/get-token`,
         method:'post',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/new/checkText
  * summary: 检测文本
 * tags: 新接口
 */
let apiBusinessNewCheckText_Param = {
     text: null,   /** 检测文本    string required:false */
   }
    
export function apiBusinessNewCheckText_Get( apiBusinessNewCheckText_Param    ) {
    return request({
         url:`/api/business/new/checkText`,
         method:'get',
                     params:apiBusinessNewCheckText_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/new/checkImg
  * summary: 检测图片
 * tags: 新接口
 */
    
export function apiBusinessNewCheckImg_Post(   ) {
    return request({
         url:`/api/business/new/checkImg`,
         method:'post',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/new/like/${apiBusinessNewLikecardId_Param["cardId"]}
  * summary: 点赞乡村(若已经点赞会取消)
 * tags: 新接口
 */
let apiBusinessNewLikecardId_Param = {
     cardId: null,   /**     string required:true */
   }
    
export function apiBusinessNewLikecardId_Post( apiBusinessNewLikecardId_Param    ) {
    return request({
         url:`/api/business/new/like/${apiBusinessNewLikecardId_Param["cardId"]}`,
         method:'post',
                
    })
}
/**  =========================================================================== ***/
