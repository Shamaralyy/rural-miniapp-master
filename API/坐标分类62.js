
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/business/coordinateTag/tagLabel
  * summary: 分类下拉数据
 * tags: 坐标分类(6-2)
 */
let apiBusinessCoordinateTagTagLabel_Param = {
     cardId: null,   /** 名片ID    string required:false */
   }
    
export function apiBusinessCoordinateTagTagLabel_Get( apiBusinessCoordinateTagTagLabel_Param    ) {
    return request({
         url:`/api/business/coordinateTag/tagLabel`,
         method:'get',
                     params:apiBusinessCoordinateTagTagLabel_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/coordinateTag
  * summary: 新增
 * tags: 坐标分类(6-2)
 */
let apiBusinessCoordinateTag_Body = {
      introduce: null,   /** 介绍   string required: */
      cardId: null,   /** 名片   number required: */
      name: null,   /** 名称   string required: */
      icon: null,   /** 图标   string required: */
      sort: null,   /** 排序   number required: */
      isShow: null,   /** 是否展示(0:正常,1:停用)   integer required: */
    }
    
export function apiBusinessCoordinateTag_Post(   apiBusinessCoordinateTag_Body) {
    return request({
         url:`/api/business/coordinateTag`,
         method:'post',
                      
                 data: apiBusinessCoordinateTag_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/coordinateTag/batchUpdateSort
  * summary: 批量修改排序(传承list集合)
 * tags: 坐标分类(6-2)
 */
let apiBusinessCoordinateTagBatchUpdateSort_Body = {
      coordinateTagId: null,   /** id   number required: */
      sort: null,   /** 排序   number required: */
    }
    
export function apiBusinessCoordinateTagBatchUpdateSort_Post(   apiBusinessCoordinateTagBatchUpdateSort_Body) {
    return request({
         url:`/api/business/coordinateTag/batchUpdateSort`,
         method:'post',
                      
                 data: apiBusinessCoordinateTagBatchUpdateSort_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/coordinateTag/page
  * summary: 列表
 * tags: 坐标分类(6-2)
 */
let apiBusinessCoordinateTagPage_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     cardId: null,   /** 名片ID    string required:false */
     name: null,   /** 名称    string required:false */
     status: null,   /** 状态(0:未审核,1:已通过,2:未通过)    string required:false */
     isShow: null,   /** 是否展示(0:正常,1:停用)    string required:false */
   }
    
export function apiBusinessCoordinateTagPage_Post( apiBusinessCoordinateTagPage_Param    ) {
    return request({
         url:`/api/business/coordinateTag/page`,
         method:'post',
                     params:apiBusinessCoordinateTagPage_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/coordinateTag/info
  * summary: 详情
 * tags: 坐标分类(6-2)
 */
let apiBusinessCoordinateTagInfo_Param = {
     tagId: null,   /** ID    string required:false */
   }
    
export function apiBusinessCoordinateTagInfo_Get( apiBusinessCoordinateTagInfo_Param    ) {
    return request({
         url:`/api/business/coordinateTag/info`,
         method:'get',
                     params:apiBusinessCoordinateTagInfo_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/coordinateTag/edit
  * summary: 修改
 * tags: 坐标分类(6-2)
 */
let apiBusinessCoordinateTagEdit_Body = {
      coordinateTagId: null,   /** ID   number required: */
      introduce: null,   /** 介绍   string required: */
      cardId: null,   /** 名片   number required: */
      name: null,   /** 名称   string required: */
      icon: null,   /** 图标   string required: */
      sort: null,   /** 排序   number required: */
      isShow: null,   /** 是否展示(0:正常,1:停用)   integer required: */
    }
    
export function apiBusinessCoordinateTagEdit_Post(   apiBusinessCoordinateTagEdit_Body) {
    return request({
         url:`/api/business/coordinateTag/edit`,
         method:'post',
                      
                 data: apiBusinessCoordinateTagEdit_Body
    })
}
/**  =========================================================================== ***/
