
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /dev/business/qa/add
  * summary: 新增常见问题
 * tags: 常见问题Controller
 */
let devBusinessQaAdd_Body = {
      createBy: null,   /** $property.description   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      name: null,   /** $column.columnComment   string required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      title: null,   /** 问题标题   string required: */
      content: null,   /** 问题答案-可以富文本   string required: */
      qaId: null,   /** $column.columnComment   integer required: */
    }
    
export function devBusinessQaAdd_Post(   devBusinessQaAdd_Body) {
    return request({
         url:`/dev/business/qa/add`,
         method:'post',
                      
                 data: devBusinessQaAdd_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /dev/business/qa/info/${devBusinessQaInfoqaId_Param["qaId"]}
  * summary: 获取常见问题详细信息
 * tags: 常见问题Controller
 */
let devBusinessQaInfoqaId_Param = {
     qaId: null,   /**     string required:true */
   }
    
export function devBusinessQaInfoqaId_Get( devBusinessQaInfoqaId_Param    ) {
    return request({
         url:`/dev/business/qa/info/${devBusinessQaInfoqaId_Param["qaId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /dev/business/qa/edit
  * summary: 修改常见问题
 * tags: 常见问题Controller
 */
let devBusinessQaEdit_Body = {
      createBy: null,   /** $property.description   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      name: null,   /** $column.columnComment   string required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      title: null,   /** 问题标题   string required: */
      content: null,   /** 问题答案-可以富文本   string required: */
      qaId: null,   /** $column.columnComment   integer required: */
    }
    
export function devBusinessQaEdit_Put(   devBusinessQaEdit_Body) {
    return request({
         url:`/dev/business/qa/edit`,
         method:'put',
                      
                 data: devBusinessQaEdit_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /dev/business/qa/list
  * summary: 分页查询常见问题列表
 * tags: 常见问题Controller
 */
let devBusinessQaList_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let devBusinessQaList_Body = {
      createBy: null,   /** $property.description   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      name: null,   /** $column.columnComment   string required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      title: null,   /** 问题标题   string required: */
      content: null,   /** 问题答案-可以富文本   string required: */
      qaId: null,   /** $column.columnComment   integer required: */
    }
        
export function devBusinessQaList_Post( devBusinessQaList_Param  , devBusinessQaList_Body) {
    return request({
         url:`/dev/business/qa/list`,
         method:'post',
                     params:devBusinessQaList_Param ,
                 data: devBusinessQaList_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /dev/business/qa/remove/${devBusinessQaRemoveqaIds_Param["qaIds"]}
  * summary: 删除常见问题
 * tags: 常见问题Controller
 */
let devBusinessQaRemoveqaIds_Param = {
     qaIds: null,   /**     string required:true */
   }
    
export function devBusinessQaRemoveqaIds_Delete( devBusinessQaRemoveqaIds_Param    ) {
    return request({
         url:`/dev/business/qa/remove/${devBusinessQaRemoveqaIds_Param["qaIds"]}`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/
