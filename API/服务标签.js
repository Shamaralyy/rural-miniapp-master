
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/business/tag/serve/edit
  * summary: 修改服务标签
 * tags: 服务标签
 */
let apiBusinessTagServeEdit_Body = {
      iconId: null,   /** 图标ID   integer required: */
      tagId: null,   /** 标签ID   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      sort: null,   /** 排序   integer required: */
      delFlag: null,   /** 删除标志（0代表存在 2代表删除）   integer required: */
      isShow: null,   /** 是否展示(0:正常,1:暂停)   integer required: */
      createBy: null,   /** $property.description   string required: */
      tabTemplate: null,   /** 标签模板   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      cardId: null,   /** 乡村名片ID   integer required: */
      name: null,   /** 标签名称   string required: */
      failMsg: null,   /** 失败原因   string required: */
      exhibit: null,   /** 展示数量   integer required: */
      status: null,   /** 状态(0:未审核,1:已通过,2:未通过)   integer required: */
    }
    
export function apiBusinessTagServeEdit_Put(   apiBusinessTagServeEdit_Body) {
    return request({
         url:`/api/business/tag/serve/edit`,
         method:'put',
                      
                 data: apiBusinessTagServeEdit_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/tag/serve/info/${apiBusinessTagServeInfotabId_Param["tabId"]}
  * summary: 获取服务标签详细信息
 * tags: 服务标签
 */
let apiBusinessTagServeInfotabId_Param = {
     tabId: null,   /**     string required:true */
   }
    
export function apiBusinessTagServeInfotabId_Get( apiBusinessTagServeInfotabId_Param    ) {
    return request({
         url:`/api/business/tag/serve/info/${apiBusinessTagServeInfotabId_Param["tabId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/tag/serve/remove/${apiBusinessTagServeRemovetabIds_Param["tabIds"]}
  * summary: 删除服务标签
 * tags: 服务标签
 */
let apiBusinessTagServeRemovetabIds_Param = {
     tabIds: null,   /**     string required:true */
   }
    
export function apiBusinessTagServeRemovetabIds_Delete( apiBusinessTagServeRemovetabIds_Param    ) {
    return request({
         url:`/api/business/tag/serve/remove/${apiBusinessTagServeRemovetabIds_Param["tabIds"]}`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/tag/serve/list
  * summary: 分页查询服务标签列表
 * tags: 服务标签
 */
let apiBusinessTagServeList_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiBusinessTagServeList_Body = {
      iconId: null,   /** 图标ID   integer required: */
      tagId: null,   /** 标签ID   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      sort: null,   /** 排序   integer required: */
      delFlag: null,   /** 删除标志（0代表存在 2代表删除）   integer required: */
      isShow: null,   /** 是否展示(0:正常,1:暂停)   integer required: */
      createBy: null,   /** $property.description   string required: */
      tabTemplate: null,   /** 标签模板   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      cardId: null,   /** 乡村名片ID   integer required: */
      name: null,   /** 标签名称   string required: */
      failMsg: null,   /** 失败原因   string required: */
      exhibit: null,   /** 展示数量   integer required: */
      status: null,   /** 状态(0:未审核,1:已通过,2:未通过)   integer required: */
    }
        
export function apiBusinessTagServeList_Post( apiBusinessTagServeList_Param  , apiBusinessTagServeList_Body) {
    return request({
         url:`/api/business/tag/serve/list`,
         method:'post',
                     params:apiBusinessTagServeList_Param ,
                 data: apiBusinessTagServeList_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/tag/serve/add
  * summary: 新增服务标签
 * tags: 服务标签
 */
let apiBusinessTagServeAdd_Body = {
      iconId: null,   /** 图标ID   integer required: */
      tabTemplate: null,   /** 标签模板   string required: */
      cardId: null,   /** 乡村名片ID   integer required: */
      name: null,   /** 标签名称   string required: */
      sort: null,   /** 排序   integer required: */
      exhibit: null,   /** 展示数量   integer required: */
      isShow: null,   /** 是否展示(0:正常,1:暂停)   integer required: */
    }
    
export function apiBusinessTagServeAdd_Post(   apiBusinessTagServeAdd_Body) {
    return request({
         url:`/api/business/tag/serve/add`,
         method:'post',
                      
                 data: apiBusinessTagServeAdd_Body
    })
}
/**  =========================================================================== ***/
