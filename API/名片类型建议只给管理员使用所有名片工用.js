
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/business/cardType/list
  * summary: 分页查询名片类型列表
 * tags: 名片类型 建议只给管理员使用 所有名片工用
 */
let apiBusinessCardTypeList_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiBusinessCardTypeList_Body = {
      createBy: null,   /** $property.description   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      introduce: null,   /** 介绍   string required: */
      name: null,   /** 名称   string required: */
      icon: null,   /** 图标   string required: */
      typeId: null,   /** 类型ID   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
    }
        
export function apiBusinessCardTypeList_Post( apiBusinessCardTypeList_Param  , apiBusinessCardTypeList_Body) {
    return request({
         url:`/api/business/cardType/list`,
         method:'post',
                     params:apiBusinessCardTypeList_Param ,
                 data: apiBusinessCardTypeList_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/cardType/remove/${apiBusinessCardTypeRemovetypeIds_Param["typeIds"]}
  * summary: 删除名片类型
 * tags: 名片类型 建议只给管理员使用 所有名片工用
 */
let apiBusinessCardTypeRemovetypeIds_Param = {
     typeIds: null,   /**     string required:true */
   }
    
export function apiBusinessCardTypeRemovetypeIds_Delete( apiBusinessCardTypeRemovetypeIds_Param    ) {
    return request({
         url:`/api/business/cardType/remove/${apiBusinessCardTypeRemovetypeIds_Param["typeIds"]}`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/cardType/edit
  * summary: 修改名片类型
 * tags: 名片类型 建议只给管理员使用 所有名片工用
 */
let apiBusinessCardTypeEdit_Body = {
      createBy: null,   /** $property.description   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      introduce: null,   /** 介绍   string required: */
      name: null,   /** 名称   string required: */
      icon: null,   /** 图标   string required: */
      typeId: null,   /** 类型ID   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
    }
    
export function apiBusinessCardTypeEdit_Put(   apiBusinessCardTypeEdit_Body) {
    return request({
         url:`/api/business/cardType/edit`,
         method:'put',
                      
                 data: apiBusinessCardTypeEdit_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/cardType/add
  * summary: 新增名片类型
 * tags: 名片类型 建议只给管理员使用 所有名片工用
 */
let apiBusinessCardTypeAdd_Body = {
      introduce: null,   /** 介绍   string required: */
      name: null,   /** 名称   string required: */
      icon: null,   /** 图标   string required: */
      failMsg: null,   /** 失败原因   string required: */
      status: null,   /** 状态(1:未审核,2:已通过,3:未通过)   integer required: */
    }
    
export function apiBusinessCardTypeAdd_Post(   apiBusinessCardTypeAdd_Body) {
    return request({
         url:`/api/business/cardType/add`,
         method:'post',
                      
                 data: apiBusinessCardTypeAdd_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/cardType/info/${apiBusinessCardTypeInfotypeId_Param["typeId"]}
  * summary: 获取名片类型详细信息
 * tags: 名片类型 建议只给管理员使用 所有名片工用
 */
let apiBusinessCardTypeInfotypeId_Param = {
     typeId: null,   /**     string required:true */
   }
    
export function apiBusinessCardTypeInfotypeId_Get( apiBusinessCardTypeInfotypeId_Param    ) {
    return request({
         url:`/api/business/cardType/info/${apiBusinessCardTypeInfotypeId_Param["typeId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/
