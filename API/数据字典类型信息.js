
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/system/dict/type/list
  * summary: 分页获取
 * tags: 数据字典 类型 信息
 */
let apiSystemDictTypeList_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
    
export function apiSystemDictTypeList_Get( apiSystemDictTypeList_Param    ) {
    return request({
         url:`/api/system/dict/type/list`,
         method:'get',
                     params:apiSystemDictTypeList_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/system/dict/type
  * summary: 新增字典类型
 * tags: 数据字典 类型 信息
 */
let apiSystemDictType_Body = {
      createBy: null,   /** 创建者   string required: */
      createTime: null,   /** 创建时间   string required: */
      updateBy: null,   /** 更新者   string required: */
      dictName: null,   /** 字典名称   string required: */
      updateTime: null,   /** 更新时间   string required: */
      remark: null,   /** 备注   string required: */
      dictId: null,   /** 字典主键   integer required: */
      params: null,   /** 请求参数   object required: */
      searchValue: null,   /** 搜索值   string required: */
      dictType: null,   /** 字典类型   string required: */
      status: null,   /** 状态（0正常 1停用）   string required: */
    }
    
export function apiSystemDictType_Post(   apiSystemDictType_Body) {
    return request({
         url:`/api/system/dict/type`,
         method:'post',
                      
                 data: apiSystemDictType_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/system/dict/type/${apiSystemDictTypedictIds_Param["dictIds"]}
  * summary: 删除字典类型
 * tags: 数据字典 类型 信息
 */
let apiSystemDictTypedictIds_Param = {
     dictIds: null,   /**     string required:true */
   }
    
export function apiSystemDictTypedictIds_Delete( apiSystemDictTypedictIds_Param    ) {
    return request({
         url:`/api/system/dict/type/${apiSystemDictTypedictIds_Param["dictIds"]}`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/system/dict/type/refreshCache
  * summary: 刷新字典缓存
 * tags: 数据字典 类型 信息
 */
    
export function apiSystemDictTypeRefreshCache_Delete(   ) {
    return request({
         url:`/api/system/dict/type/refreshCache`,
         method:'delete',
                      
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/system/dict/type/optionselect
  * summary: 获取字典选择框列表
 * tags: 数据字典 类型 信息
 */
    
export function apiSystemDictTypeOptionselect_Get(   ) {
    return request({
         url:`/api/system/dict/type/optionselect`,
         method:'get',
                      
                
    })
}
/**  =========================================================================== ***/
