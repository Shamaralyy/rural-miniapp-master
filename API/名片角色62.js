
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/business/roleApply/apply
  * summary: 申请
 * tags: 名片角色(6-2)
 */
let apiBusinessRoleApplyApply_Body = {
      reason: null,   /** 申请原因   string required: */
      prove: null,   /** 证明材料   string required: */
      isWhitelist: null,   /** 白名单(1:是,0:否)   number required: */
      roleId: null,   /** 申请的角色ID   number required: */
      cardId: null,   /** 名片ID   number required: */
      remark: null,   /** 备注   string required: */
      job: null,   /** 村内职务   string required: */
      type: null,   /** 申请类型(1:村民,2:共建者,3:管理员)   number required: */
      orgId: null,   /** 组织ID(暂时未用)   number required: */
      status: null,   /** 审核状态(0:待审核,1:通过,2:失败)   number required: */
    }
    
export function apiBusinessRoleApplyApply_Post(   apiBusinessRoleApplyApply_Body) {
    return request({
         url:`/api/business/roleApply/apply`,
         method:'post',
                      
                 data: apiBusinessRoleApplyApply_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/roleApply/page
  * summary: 列表(查询我自己的角色)
 * tags: 名片角色(6-2)
 */
let apiBusinessRoleApplyPage_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     cardId: null,   /** 名片ID    string required:false */
   }
    
export function apiBusinessRoleApplyPage_Get( apiBusinessRoleApplyPage_Param    ) {
    return request({
         url:`/api/business/roleApply/page`,
         method:'get',
                     params:apiBusinessRoleApplyPage_Param  
                
    })
}
/**  =========================================================================== ***/
