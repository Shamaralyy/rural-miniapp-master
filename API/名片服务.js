
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/business/serve/remove/${apiBusinessServeRemoveserveIds_Param["serveIds"]}
  * summary: 删除服务
 * tags: 名片服务
 */
let apiBusinessServeRemoveserveIds_Param = {
     serveIds: null,   /**     string required:true */
   }
    
export function apiBusinessServeRemoveserveIds_Delete( apiBusinessServeRemoveserveIds_Param    ) {
    return request({
         url:`/api/business/serve/remove/${apiBusinessServeRemoveserveIds_Param["serveIds"]}`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/serve/edit
  * summary: 修改服务
 * tags: 名片服务
 */
let apiBusinessServeEdit_Body = {
      iconId: null,   /** 设施图标ID   string required: */
      createUserId: null,   /** 创建者的用户ID   integer required: */
      images: null,   /** 图集   string required: */
      tagId: null,   /** 服务标签ID   string required: */
      coordinateId: null,   /** 坐标ID   integer required: */
      serveId: null,   /** 服务ID   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      synopsis: null,   /** 简介   string required: */
      title: null,   /** 标题   string required: */
      delFlag: null,   /** 删除标志（0代表存在 2代表删除）   integer required: */
      content: null,   /** 内容(富文本)   string required: */
      pageviews: null,   /** 浏览量   integer required: */
      createBy: null,   /** $property.description   string required: */
      sendContent: null,   /** 传送内容   string required: */
      videoUrl: null,   /** 视频   string required: */
      versions: null,   /** 版本   integer required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      cardId: null,   /** 名片ID   integer required: */
      sendType: null,   /** 传送类型(1:手机,2:微信二维码,3:微信小店,4:微店)   integer required: */
      status: null,   /** 状态(0:未审核,1:已通过,2:未通过)   integer required: */
    }
    
export function apiBusinessServeEdit_Put(   apiBusinessServeEdit_Body) {
    return request({
         url:`/api/business/serve/edit`,
         method:'put',
                      
                 data: apiBusinessServeEdit_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/serve/add
  * summary: 新增 服务
 * tags: 名片服务
 */
let apiBusinessServeAdd_Body = {
      iconId: null,   /** 设施图标ID   string required: */
      images: null,   /** 图集   string required: */
      sendContent: null,   /** 传送内容   string required: */
      videoUrl: null,   /** 视频   string required: */
      tagId: null,   /** 服务标签ID   string required: */
      cardId: null,   /** 名片ID   integer required: */
      coordinateId: null,   /** 坐标ID   integer required: */
      sendType: null,   /** 传送类型(1:手机,2:微信二维码,3:微信小店,4:微店)   integer required: */
      synopsis: null,   /** 简介   string required: */
      title: null,   /** 标题   string required: */
      content: null,   /** 内容(富文本)   string required: */
    }
    
export function apiBusinessServeAdd_Post(   apiBusinessServeAdd_Body) {
    return request({
         url:`/api/business/serve/add`,
         method:'post',
                      
                 data: apiBusinessServeAdd_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/serve/list
  * summary: 分页查询服务列表
 * tags: 名片服务
 */
let apiBusinessServeList_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiBusinessServeList_Body = {
      iconId: null,   /** 设施图标ID   string required: */
      createUserId: null,   /** 创建者的用户ID   integer required: */
      images: null,   /** 图集   string required: */
      tagId: null,   /** 服务标签ID   string required: */
      coordinateId: null,   /** 坐标ID   integer required: */
      serveId: null,   /** 服务ID   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      synopsis: null,   /** 简介   string required: */
      title: null,   /** 标题   string required: */
      delFlag: null,   /** 删除标志（0代表存在 2代表删除）   integer required: */
      content: null,   /** 内容(富文本)   string required: */
      pageviews: null,   /** 浏览量   integer required: */
      createBy: null,   /** $property.description   string required: */
      sendContent: null,   /** 传送内容   string required: */
      videoUrl: null,   /** 视频   string required: */
      versions: null,   /** 版本   integer required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      cardId: null,   /** 名片ID   integer required: */
      sendType: null,   /** 传送类型(1:手机,2:微信二维码,3:微信小店,4:微店)   integer required: */
      status: null,   /** 状态(0:未审核,1:已通过,2:未通过)   integer required: */
    }
        
export function apiBusinessServeList_Post( apiBusinessServeList_Param  , apiBusinessServeList_Body) {
    return request({
         url:`/api/business/serve/list`,
         method:'post',
                     params:apiBusinessServeList_Param ,
                 data: apiBusinessServeList_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/serve/info/${apiBusinessServeInfoserveId_Param["serveId"]}
  * summary: 获取服务详细信息
 * tags: 名片服务
 */
let apiBusinessServeInfoserveId_Param = {
     serveId: null,   /**     string required:true */
   }
    
export function apiBusinessServeInfoserveId_Get( apiBusinessServeInfoserveId_Param    ) {
    return request({
         url:`/api/business/serve/info/${apiBusinessServeInfoserveId_Param["serveId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/
