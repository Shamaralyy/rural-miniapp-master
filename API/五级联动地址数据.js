
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/business/addr/info/${apiBusinessAddrInfoid_Param["id"]}
  * summary: 获取五级联动地址数据详细信息
 * tags: 五级联动地址数据
 */
let apiBusinessAddrInfoid_Param = {
     id: null,   /**     string required:true */
   }
    
export function apiBusinessAddrInfoid_Get( apiBusinessAddrInfoid_Param    ) {
    return request({
         url:`/api/business/addr/info/${apiBusinessAddrInfoid_Param["id"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/addr/remove/${apiBusinessAddrRemoveids_Param["ids"]}
  * summary: 删除五级联动地址数据
 * tags: 五级联动地址数据
 */
let apiBusinessAddrRemoveids_Param = {
     ids: null,   /**     string required:true */
   }
    
export function apiBusinessAddrRemoveids_Delete( apiBusinessAddrRemoveids_Param    ) {
    return request({
         url:`/api/business/addr/remove/${apiBusinessAddrRemoveids_Param["ids"]}`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/addr/edit
  * summary: 修改五级联动地址数据
 * tags: 五级联动地址数据
 */
let apiBusinessAddrEdit_Body = {
      level: null,   /** 等级   integer required: */
      cityCode: null,   /** 城市代码   string required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      type: null,   /** 类型   string required: */
      officialCode: null,   /** 官方代码   string required: */
      createBy: null,   /** $property.description   string required: */
      parentCode: null,   /** 父级代码   integer required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      oldName: null,   /** 原名称   string required: */
      lowerAddr: null,   /** 父级地址   array required: */
      name: null,   /** 名称   string required: */
      property: null,   /** 属性=NULL-未注册,0未注册乡村卡片,1-已注册乡村   integer required: */
      parentAddr: null,   /** 父级地址   object required: */
      id: null,   /** $column.columnComment   integer required: */
    }
    
export function apiBusinessAddrEdit_Put(   apiBusinessAddrEdit_Body) {
    return request({
         url:`/api/business/addr/edit`,
         method:'put',
                      
                 data: apiBusinessAddrEdit_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/addr/level
  * summary: 根据级别获取联动数据
 * tags: 五级联动地址数据
 */
let apiBusinessAddrLevel_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     level: null,   /** 等级    string required:false */
   }
    
export function apiBusinessAddrLevel_Get( apiBusinessAddrLevel_Param    ) {
    return request({
         url:`/api/business/addr/level`,
         method:'get',
                     params:apiBusinessAddrLevel_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/addr/add
  * summary: 新增五级联动地址数据
 * tags: 五级联动地址数据
 */
let apiBusinessAddrAdd_Body = {
      level: null,   /** 等级   integer required: */
      parentCode: null,   /** 父级代码   integer required: */
      parentCodeStr: null,   /** 父级代码字符串   string required: */
      cityCode: null,   /** 城市代码   string required: */
      oldName: null,   /** 原名称   string required: */
      name: null,   /** 名称   string required: */
      property: null,   /** 属性=NULL-未注册,0未注册乡村卡片,1-已注册乡村   integer required: */
      type: null,   /** 类型   string required: */
      officialCode: null,   /** 官方代码   string required: */
    }
    
export function apiBusinessAddrAdd_Post(   apiBusinessAddrAdd_Body) {
    return request({
         url:`/api/business/addr/add`,
         method:'post',
                      
                 data: apiBusinessAddrAdd_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/addr/lower
  * summary: 获取下级联动数据
 * tags: 五级联动地址数据
 */
let apiBusinessAddrLower_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     level: null,   /** 等级    string required:false */
     keyword: null,   /** 关键词    string required:false */
     parentCode: null,   /** 城市代码 !(不要用id了 用自个)    string required:false */
     id: null,   /**     string required:false */
     status: null,   /** 状态(0:未审核,1:已通过,2:未通过)    string required:false */
   }
    
export function apiBusinessAddrLower_Get( apiBusinessAddrLower_Param    ) {
    return request({
         url:`/api/business/addr/lower`,
         method:'get',
                     params:apiBusinessAddrLower_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/addr/recursionSearch
  * summary: (全新)搜索五级联动数据地址
 * tags: 五级联动地址数据
 */
let apiBusinessAddrRecursionSearch_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     keyword: null,   /** 关键字, 可为空,为空不筛选    string required:false */
     isAsc: null,   /** 根据 是否注册地址排序 可为空,默认为true    string required:false */
     level: null,   /** 筛选第几级的数据,可为空默认第五级    string required:false */
     id: null,   /** 根据id 查询 为空则不筛选    string required:false */
     status: null,   /** 状态(0:未审核,1:已通过,2:未通过)    string required:false */
   }
    
export function apiBusinessAddrRecursionSearch_Post( apiBusinessAddrRecursionSearch_Param    ) {
    return request({
         url:`/api/business/addr/recursionSearch`,
         method:'post',
                     params:apiBusinessAddrRecursionSearch_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/addr/cascader
  * summary: 分级别查询
 * tags: 五级联动地址数据
 */
let apiBusinessAddrCascader_Param = {
     parentCode: null,   /** 等级    string required:false */
     level: null,   /** 等级    string required:false */
     officialCode: null,   /** 官方代码    string required:false */
   }
    
export function apiBusinessAddrCascader_Get( apiBusinessAddrCascader_Param    ) {
    return request({
         url:`/api/business/addr/cascader`,
         method:'get',
                     params:apiBusinessAddrCascader_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/addr/search
  * summary: 搜索五级联动数据地址
 * tags: 五级联动地址数据
 */
let apiBusinessAddrSearch_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     keyword: null,   /** 关键字, 可为空,为空不筛选    string required:false */
     isAsc: null,   /** 根据 是否注册地址排序 可为空,默认为true    string required:false */
     level: null,   /** 筛选第几级的数据,可为空默认第五级    string required:false */
     id: null,   /** 根据id 查询 为空则不筛选    string required:false */
     status: null,   /** 状态(0:未审核,1:已通过,2:未通过)    string required:false */
   }
    
export function apiBusinessAddrSearch_Post( apiBusinessAddrSearch_Param    ) {
    return request({
         url:`/api/business/addr/search`,
         method:'post',
                     params:apiBusinessAddrSearch_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/addr/list
  * summary: 分页查询五级联动地址数据列表
 * tags: 五级联动地址数据
 */
let apiBusinessAddrList_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiBusinessAddrList_Body = {
      level: null,   /** 等级   integer required: */
      cityCode: null,   /** 城市代码   string required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      type: null,   /** 类型   string required: */
      officialCode: null,   /** 官方代码   string required: */
      createBy: null,   /** $property.description   string required: */
      parentCode: null,   /** 父级代码   integer required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      oldName: null,   /** 原名称   string required: */
      lowerAddr: null,   /** 父级地址   array required: */
      name: null,   /** 名称   string required: */
      property: null,   /** 属性=NULL-未注册,0未注册乡村卡片,1-已注册乡村   integer required: */
      parentAddr: null,   /** 父级地址   object required: */
      id: null,   /** $column.columnComment   integer required: */
    }
        
export function apiBusinessAddrList_Post( apiBusinessAddrList_Param  , apiBusinessAddrList_Body) {
    return request({
         url:`/api/business/addr/list`,
         method:'post',
                     params:apiBusinessAddrList_Param ,
                 data: apiBusinessAddrList_Body
    })
}
/**  =========================================================================== ***/
