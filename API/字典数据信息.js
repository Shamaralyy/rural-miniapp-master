
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/system/dict/data/${apiSystemDictDatadictCode_Param["dictCode"]}
  * summary: 查询字典数据详细
 * tags: 字典 数据 信息
 */
let apiSystemDictDatadictCode_Param = {
     dictCode: null,   /**     string required:true */
   }
    
export function apiSystemDictDatadictCode_Get( apiSystemDictDatadictCode_Param    ) {
    return request({
         url:`/api/system/dict/data/${apiSystemDictDatadictCode_Param["dictCode"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/system/dict/data/type/${apiSystemDictDataTypedictType_Param["dictType"]}
  * summary: 根据字典类型查询字典数据信息
 * tags: 字典 数据 信息
 */
let apiSystemDictDataTypedictType_Param = {
     dictType: null,   /**     string required:true */
   }
    
export function apiSystemDictDataTypedictType_Get( apiSystemDictDataTypedictType_Param    ) {
    return request({
         url:`/api/system/dict/data/type/${apiSystemDictDataTypedictType_Param["dictType"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/system/dict/data
  * summary: 新增字典类型
 * tags: 字典 数据 信息
 */
let apiSystemDictData_Body = {
      dictValue: null,   /** 字典键值   string required: */
      listClass: null,   /** 表格字典样式   string required: */
      dictSort: null,   /** 字典排序   integer required: */
      updateTime: null,   /** 更新时间   string required: */
      remark: null,   /** 备注   string required: */
      params: null,   /** 请求参数   object required: */
      dictType: null,   /** 字典类型   string required: */
      dictLabel: null,   /** 字典标签   string required: */
      isDefault: null,   /** 是否默认（Y是 N否）   string required: */
      createBy: null,   /** 创建者   string required: */
      cssClass: null,   /** 样式属性（其他样式扩展）   string required: */
      dictCode: null,   /** 字典编码   integer required: */
      createTime: null,   /** 创建时间   string required: */
      updateBy: null,   /** 更新者   string required: */
      searchValue: null,   /** 搜索值   string required: */
      status: null,   /** 状态（0正常 1停用）   string required: */
    }
    
export function apiSystemDictData_Post(   apiSystemDictData_Body) {
    return request({
         url:`/api/system/dict/data`,
         method:'post',
                      
                 data: apiSystemDictData_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/system/dict/data/${apiSystemDictDatadictCodes_Param["dictCodes"]}
  * summary: 删除字典类型
 * tags: 字典 数据 信息
 */
let apiSystemDictDatadictCodes_Param = {
     dictCodes: null,   /**     string required:true */
   }
    
export function apiSystemDictDatadictCodes_Delete( apiSystemDictDatadictCodes_Param    ) {
    return request({
         url:`/api/system/dict/data/${apiSystemDictDatadictCodes_Param["dictCodes"]}`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/system/dict/data/list
  * summary: 分页获取数据字典
 * tags: 字典 数据 信息
 */
let apiSystemDictDataList_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
    
export function apiSystemDictDataList_Get( apiSystemDictDataList_Param    ) {
    return request({
         url:`/api/system/dict/data/list`,
         method:'get',
                     params:apiSystemDictDataList_Param  
                
    })
}
/**  =========================================================================== ***/
