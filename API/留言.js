
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /dev/business/msg/remove/${devBusinessMsgRemoveleaMsgIds_Param["leaMsgIds"]}
  * summary: 删除留言
 * tags: 留言
 */
let devBusinessMsgRemoveleaMsgIds_Param = {
     leaMsgIds: null,   /**     string required:true */
   }
    
export function devBusinessMsgRemoveleaMsgIds_Delete( devBusinessMsgRemoveleaMsgIds_Param    ) {
    return request({
         url:`/dev/business/msg/remove/${devBusinessMsgRemoveleaMsgIds_Param["leaMsgIds"]}`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/dev/business/msg/add
  * summary: 新增留言new
 * tags: 留言
 */
let apiDevBusinessMsgAdd_Body = {
      ruralCardId: null,   /** 乡村id   integer required: */
      msg: null,   /** 留言内容   string required: */
      createBy: null,   /** $property.description   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      ruralCardName: null,   /** 乡村名   string required: */
      leaMsgId: null,   /** $column.columnComment   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      avatar: null,   /** 图片   string required: */
      status: null,   /** 留言状态   integer required: */
    }
    
export function apiDevBusinessMsgAdd_Post(   apiDevBusinessMsgAdd_Body) {
    return request({
         url:`/api/dev/business/msg/add`,
         method:'post',
                      
                 data: apiDevBusinessMsgAdd_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /dev/business/msg/list
  * summary: 分页查询留言列表
 * tags: 留言
 */
let devBusinessMsgList_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let devBusinessMsgList_Body = {
      ruralCardId: null,   /** 乡村id   integer required: */
      msg: null,   /** 留言内容   string required: */
      createBy: null,   /** $property.description   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      ruralCardName: null,   /** 乡村名   string required: */
      leaMsgId: null,   /** $column.columnComment   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      avatar: null,   /** 图片   string required: */
      status: null,   /** 留言状态   integer required: */
    }
        
export function devBusinessMsgList_Post( devBusinessMsgList_Param  , devBusinessMsgList_Body) {
    return request({
         url:`/dev/business/msg/list`,
         method:'post',
                     params:devBusinessMsgList_Param ,
                 data: devBusinessMsgList_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /dev/business/msg/page
  * summary: 增强查询 轮播图 列表
 * tags: 留言
 */
let devBusinessMsgPage_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     ruralCardId: null,   /** 名片id    string required:false */
     reviewerStatus: null,   /** 审核状态（0:未审核,1:已通过,2:未通过）    string required:false */
     userId: null,   /** 创建人    string required:false */
     status: null,   /** 留言状态    string required:false */
   }
    
export function devBusinessMsgPage_Post( devBusinessMsgPage_Param    ) {
    return request({
         url:`/dev/business/msg/page`,
         method:'post',
                     params:devBusinessMsgPage_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/dev/business/msg/edit
  * summary: 修改留言new
 * tags: 留言
 */
let apiDevBusinessMsgEdit_Body = {
      msg: null,   /** 留言内容   string required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      reviewerStatus: null,   /** 状态(0:未审核,1:已通过,2:未通过)   integer required: */
      avatar: null,   /** 图片   string required: */
      ruralCardId: null,   /** 乡村id   integer required: */
      createBy: null,   /** $property.description   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      ruralCardName: null,   /** 乡村名   string required: */
      failMsg: null,   /** 失败原因   string required: */
      leaMsgId: null,   /** $column.columnComment   integer required: */
      status: null,   /** 留言状态   integer required: */
    }
    
export function apiDevBusinessMsgEdit_Put(   apiDevBusinessMsgEdit_Body) {
    return request({
         url:`/api/dev/business/msg/edit`,
         method:'put',
                      
                 data: apiDevBusinessMsgEdit_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /dev/business/msg/add
  * summary: 新增留言
 * tags: 留言
 */
let devBusinessMsgAdd_Body = {
      ruralCardId: null,   /** 乡村id   integer required: */
      msg: null,   /** 留言内容   string required: */
      createTime: null,   /** $property.description   integer required: */
      ruralCardName: null,   /** 乡村名   string required: */
      leaMsgId: null,   /** $column.columnComment   integer required: */
      reviewerStatus: null,   /** 状态(0:未审核,1:已通过,2:未通过)   integer required: */
      avatar: null,   /** 图片   string required: */
      status: null,   /** 留言状态   integer required: */
    }
    
export function devBusinessMsgAdd_Post(   devBusinessMsgAdd_Body) {
    return request({
         url:`/dev/business/msg/add`,
         method:'post',
                      
                 data: devBusinessMsgAdd_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/dev/business/msg/remove/${apiDevBusinessMsgRemoveleaMsgIds_Param["leaMsgIds"]}
  * summary: 删除留言new
 * tags: 留言
 */
let apiDevBusinessMsgRemoveleaMsgIds_Param = {
     leaMsgIds: null,   /** [1,2]. 数组集合    string required:true */
   }
    
export function apiDevBusinessMsgRemoveleaMsgIds_Delete( apiDevBusinessMsgRemoveleaMsgIds_Param    ) {
    return request({
         url:`/api/dev/business/msg/remove/${apiDevBusinessMsgRemoveleaMsgIds_Param["leaMsgIds"]}`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/dev/business/msg/list
  * summary: 分页查询留言列表
 * tags: 留言
 */
let apiDevBusinessMsgList_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiDevBusinessMsgList_Body = {
      ruralCardId: null,   /** 乡村id   integer required: */
      msg: null,   /** 留言内容   string required: */
      createBy: null,   /** $property.description   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      ruralCardName: null,   /** 乡村名   string required: */
      leaMsgId: null,   /** $column.columnComment   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      avatar: null,   /** 图片   string required: */
      status: null,   /** 留言状态   integer required: */
    }
        
export function apiDevBusinessMsgList_Post( apiDevBusinessMsgList_Param  , apiDevBusinessMsgList_Body) {
    return request({
         url:`/api/dev/business/msg/list`,
         method:'post',
                     params:apiDevBusinessMsgList_Param ,
                 data: apiDevBusinessMsgList_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/dev/business/msg/info/${apiDevBusinessMsgInfoleaMsgId_Param["leaMsgId"]}
  * summary: 获取留言详细信息
 * tags: 留言
 */
let apiDevBusinessMsgInfoleaMsgId_Param = {
     leaMsgId: null,   /**     string required:true */
   }
    
export function apiDevBusinessMsgInfoleaMsgId_Get( apiDevBusinessMsgInfoleaMsgId_Param    ) {
    return request({
         url:`/api/dev/business/msg/info/${apiDevBusinessMsgInfoleaMsgId_Param["leaMsgId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/dev/business/msg/page
  * summary: 增强查询 轮播图 列表new
 * tags: 留言
 */
let apiDevBusinessMsgPage_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     ruralCardId: null,   /** 名片id    string required:false */
     userId: null,   /** 会员ID    string required:false */
     status: null,   /** 留言状态    string required:false */
     reviewerStatus: null,   /** 状态(0:未审核,1:已通过,2:未通过)    string required:false */
   }
    
export function apiDevBusinessMsgPage_Post( apiDevBusinessMsgPage_Param    ) {
    return request({
         url:`/api/dev/business/msg/page`,
         method:'post',
                     params:apiDevBusinessMsgPage_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /dev/business/msg/info/${devBusinessMsgInfoleaMsgId_Param["leaMsgId"]}
  * summary: 获取留言详细信息
 * tags: 留言
 */
let devBusinessMsgInfoleaMsgId_Param = {
     leaMsgId: null,   /**     string required:true */
   }
    
export function devBusinessMsgInfoleaMsgId_Get( devBusinessMsgInfoleaMsgId_Param    ) {
    return request({
         url:`/dev/business/msg/info/${devBusinessMsgInfoleaMsgId_Param["leaMsgId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /dev/business/msg/edit
  * summary: 修改留言
 * tags: 留言
 */
let devBusinessMsgEdit_Body = {
      ruralCardId: null,   /** 乡村id   integer required: */
      msg: null,   /** 留言内容   string required: */
      createTime: null,   /** $property.description   integer required: */
      ruralCardName: null,   /** 乡村名   string required: */
      leaMsgId: null,   /** $column.columnComment   integer required: */
      reviewerStatus: null,   /** 状态(0:未审核,1:已通过,2:未通过)   integer required: */
      avatar: null,   /** 图片   string required: */
      status: null,   /** 留言状态   integer required: */
    }
    
export function devBusinessMsgEdit_Put(   devBusinessMsgEdit_Body) {
    return request({
         url:`/dev/business/msg/edit`,
         method:'put',
                      
                 data: devBusinessMsgEdit_Body
    })
}
/**  =========================================================================== ***/
