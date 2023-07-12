
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/business/record/list
  * summary: 分页查询名片修改记录列表
 * tags: 名片/服务/资讯修改 共建
 */
let apiBusinessRecordList_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiBusinessRecordList_Body = {
      sureContent: null,   /** 确定内容   string required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      type: null,   /** 类型(1:名片,2:服务,3:资讯)   integer required: */
      userId: null,   /** 用户ID   integer required: */
      isShow: null,   /** 是否显示 1显示 0隐藏   integer required: */
      recordId: null,   /** 记录ID   integer required: */
      reviewerUserId: null,   /** 审核人用户ID   integer required: */
      createBy: null,   /** $property.description   string required: */
      field: null,   /** 字段   string required: */
      versions: null,   /** 版本值   integer required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      cardId: null,   /** 所属名片ID   integer required: */
      reviewerTime: null,   /** 审核时间   integer required: */
      failMsg: null,   /** 失败原因   string required: */
      typeId: null,   /** 类型ID   integer required: */
      updateContent: null,   /** 修改内容   string required: */
      originalContent: null,   /** 原始内容   string required: */
      status: null,   /** 状态-0-未生效,1-生效,2-回退   integer required: */
    }
        
export function apiBusinessRecordList_Post( apiBusinessRecordList_Param  , apiBusinessRecordList_Body) {
    return request({
         url:`/api/business/record/list`,
         method:'post',
                     params:apiBusinessRecordList_Param ,
                 data: apiBusinessRecordList_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/record/page
  * summary: 增强 修改记录列表
 * tags: 名片/服务/资讯修改 共建
 */
let apiBusinessRecordPage_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     status: null,   /** 根据状态筛选 状态-0-未生效,1-生效,2-回退    string required:false */
   }
    
export function apiBusinessRecordPage_Post( apiBusinessRecordPage_Param    ) {
    return request({
         url:`/api/business/record/page`,
         method:'post',
                     params:apiBusinessRecordPage_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/record/approve
  * summary: 审批 共建修改
 * tags: 名片/服务/资讯修改 共建
 */
let apiBusinessRecordApprove_Body = {
      recordId: null,   /** 记录ID   integer required: */
      failMsg: null,   /** 失败原因   string required: */
      sureContent: null,   /** 确定内容   string required: */
      opinion: null,   /** 审批意见 1 同意修改,2不同意修改   integer required: */
    }
    
export function apiBusinessRecordApprove_Put(   apiBusinessRecordApprove_Body) {
    return request({
         url:`/api/business/record/approve`,
         method:'put',
                      
                 data: apiBusinessRecordApprove_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/record/add
  * summary: 1:名片,2:服务,3:资讯共建 修改
 * tags: 名片/服务/资讯修改 共建
 */
let apiBusinessRecordAdd_Body = {
      field: null,   /** 字段   string required: */
      versions: null,   /** 版本值   integer required: */
      cardId: null,   /** 所属村的名片id   integer required: */
      typeId: null,   /** 类型ID:如名片的id   integer required: */
      type: null,   /** 类型(1:名片,2:服务,3:资讯)   integer required: */
      updateContent: null,   /** 修改内容   string required: */
      originalContent: null,   /** 原始内容   string required: */
    }
    
export function apiBusinessRecordAdd_Post(   apiBusinessRecordAdd_Body) {
    return request({
         url:`/api/business/record/add`,
         method:'post',
                      
                 data: apiBusinessRecordAdd_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/record/revert/${apiBusinessRecordRevertrecordId_Param["recordId"]}
  * summary: 回滚名片
 * tags: 名片/服务/资讯修改 共建
 */
let apiBusinessRecordRevertrecordId_Param = {
     recordId: null,   /** id    string required:true */
   }
    
export function apiBusinessRecordRevertrecordId_Get( apiBusinessRecordRevertrecordId_Param    ) {
    return request({
         url:`/api/business/record/revert/${apiBusinessRecordRevertrecordId_Param["recordId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/record/remove/${apiBusinessRecordRemoverecordIds_Param["recordIds"]}
  * summary: 删除修改记录
 * tags: 名片/服务/资讯修改 共建
 */
let apiBusinessRecordRemoverecordIds_Param = {
     recordIds: null,   /** 多个id    string required:true */
   }
    
export function apiBusinessRecordRemoverecordIds_Delete( apiBusinessRecordRemoverecordIds_Param    ) {
    return request({
         url:`/api/business/record/remove/${apiBusinessRecordRemoverecordIds_Param["recordIds"]}`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/record/info/${apiBusinessRecordInforecordId_Param["recordId"]}
  * summary: 获取修改记录详细信息
 * tags: 名片/服务/资讯修改 共建
 */
let apiBusinessRecordInforecordId_Param = {
     recordId: null,   /** id    string required:true */
   }
    
export function apiBusinessRecordInforecordId_Get( apiBusinessRecordInforecordId_Param    ) {
    return request({
         url:`/api/business/record/info/${apiBusinessRecordInforecordId_Param["recordId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/
