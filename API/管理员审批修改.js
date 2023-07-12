
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/admin/approve/approve/informationTag
  * summary: 审批用户发布的 咨询
 * tags: 管理员 审批 修改
 */
let apiAdminApproveApproveInformationTag_Body = {
      id: null,   /** 要审批的id   integer required: */
      opinion: null,   /** 审批意见 1同意,2拒绝   integer required: */
    }
    
export function apiAdminApproveApproveInformationTag_Post(   apiAdminApproveApproveInformationTag_Body) {
    return request({
         url:`/api/admin/approve/approve/informationTag`,
         method:'post',
                      
                 data: apiAdminApproveApproveInformationTag_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/admin/approve/approve/cardJoin
  * summary: 审批用户加入村
 * tags: 管理员 审批 修改
 */
let apiAdminApproveApproveCardJoin_Body = {
      id: null,   /** 要审批的id   integer required: */
      opinion: null,   /** 审批意见 1同意,2拒绝   integer required: */
    }
    
export function apiAdminApproveApproveCardJoin_Post(   apiAdminApproveApproveCardJoin_Body) {
    return request({
         url:`/api/admin/approve/approve/cardJoin`,
         method:'post',
                      
                 data: apiAdminApproveApproveCardJoin_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/admin/approve/approve/serveTag
  * summary: 审批用户发布的 服务
 * tags: 管理员 审批 修改
 */
let apiAdminApproveApproveServeTag_Body = {
      id: null,   /** 要审批的id   integer required: */
      opinion: null,   /** 审批意见 1同意,2拒绝   integer required: */
    }
    
export function apiAdminApproveApproveServeTag_Post(   apiAdminApproveApproveServeTag_Body) {
    return request({
         url:`/api/admin/approve/approve/serveTag`,
         method:'post',
                      
                 data: apiAdminApproveApproveServeTag_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/admin/approve/approve/card
  * summary: 审批用户 创建的名片
 * tags: 管理员 审批 修改
 */
let apiAdminApproveApproveCard_Body = {
      id: null,   /** 要审批的id   integer required: */
      opinion: null,   /** 审批意见 1同意,2拒绝   integer required: */
    }
    
export function apiAdminApproveApproveCard_Post(   apiAdminApproveApproveCard_Body) {
    return request({
         url:`/api/admin/approve/approve/card`,
         method:'post',
                      
                 data: apiAdminApproveApproveCard_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/admin/approve/approve/serve
  * summary: 审批用户发布的 服务
 * tags: 管理员 审批 修改
 */
let apiAdminApproveApproveServe_Body = {
      id: null,   /** 要审批的id   integer required: */
      opinion: null,   /** 审批意见 1同意,2拒绝   integer required: */
    }
    
export function apiAdminApproveApproveServe_Post(   apiAdminApproveApproveServe_Body) {
    return request({
         url:`/api/admin/approve/approve/serve`,
         method:'post',
                      
                 data: apiAdminApproveApproveServe_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/admin/approve/approve/information
  * summary: 审批用户发布的 咨询
 * tags: 管理员 审批 修改
 */
let apiAdminApproveApproveInformation_Body = {
      id: null,   /** 要审批的id   integer required: */
      opinion: null,   /** 审批意见 1同意,2拒绝   integer required: */
    }
    
export function apiAdminApproveApproveInformation_Post(   apiAdminApproveApproveInformation_Body) {
    return request({
         url:`/api/admin/approve/approve/information`,
         method:'post',
                      
                 data: apiAdminApproveApproveInformation_Body
    })
}
/**  =========================================================================== ***/
