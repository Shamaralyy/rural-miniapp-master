
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/business/routeTag/list
  * summary: 分页路线标签列表
 * tags: 路线标签
 */
let apiBusinessRouteTagList_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     cardId: null,   /** 名片ID    string required:false */
     name: null,   /** 名称    string required:false */
     status: null,   /** 状态(0:未审核,1:已通过,2:未通过)    string required:false */
   }
    
export function apiBusinessRouteTagList_Post( apiBusinessRouteTagList_Param    ) {
    return request({
         url:`/api/business/routeTag/list`,
         method:'post',
                     params:apiBusinessRouteTagList_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/routeTag/add
  * summary: 新增路线标签
 * tags: 路线标签
 */
let apiBusinessRouteTagAdd_Body = {
      tabTemplate: null,   /** 标签模板   string required: */
      cardId: null,   /** 乡村名片ID   number required: */
      icon: null,   /** 图标   string required: */
      name: null,   /** 标签名称   string required: */
      sort: null,   /** 排序   number required: */
      exhibit: null,   /** 展示数量   number required: */
      isShow: null,   /** 是否展示(0:正常,1:停用)   number required: */
    }
    
export function apiBusinessRouteTagAdd_Post(   apiBusinessRouteTagAdd_Body) {
    return request({
         url:`/api/business/routeTag/add`,
         method:'post',
                      
                 data: apiBusinessRouteTagAdd_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/routeTag/remove/${apiBusinessRouteTagRemoverouteTagIdIds_Param["routeTagIdIds"]}
  * summary: 删除路线标签
 * tags: 路线标签
 */
let apiBusinessRouteTagRemoverouteTagIdIds_Param = {
     routeTagIdIds: null,   /**     string required:true */
   }
    
export function apiBusinessRouteTagRemoverouteTagIdIds_Delete( apiBusinessRouteTagRemoverouteTagIdIds_Param    ) {
    return request({
         url:`/api/business/routeTag/remove/${apiBusinessRouteTagRemoverouteTagIdIds_Param["routeTagIdIds"]}`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/routeTag/info/${apiBusinessRouteTagInforouteTagId_Param["routeTagId"]}
  * summary: 获取路线标签详细信息
 * tags: 路线标签
 */
let apiBusinessRouteTagInforouteTagId_Param = {
     routeTagId: null,   /**     string required:true */
   }
    
export function apiBusinessRouteTagInforouteTagId_Get( apiBusinessRouteTagInforouteTagId_Param    ) {
    return request({
         url:`/api/business/routeTag/info/${apiBusinessRouteTagInforouteTagId_Param["routeTagId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/routeTag/tagLabel
  * summary: 分类下拉数据
 * tags: 路线标签
 */
let apiBusinessRouteTagTagLabel_Param = {
     cardId: null,   /** 名片ID    string required:false */
   }
    
export function apiBusinessRouteTagTagLabel_Get( apiBusinessRouteTagTagLabel_Param    ) {
    return request({
         url:`/api/business/routeTag/tagLabel`,
         method:'get',
                     params:apiBusinessRouteTagTagLabel_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/routeTag/batchUpdateSort
  * summary: 批量修改排序(传承list集合)
 * tags: 路线标签
 */
let apiBusinessRouteTagBatchUpdateSort_Body = {
      sort: null,   /** 排序   number required: */
      routeTagId: null,   /** id   number required: */
    }
    
export function apiBusinessRouteTagBatchUpdateSort_Post(   apiBusinessRouteTagBatchUpdateSort_Body) {
    return request({
         url:`/api/business/routeTag/batchUpdateSort`,
         method:'post',
                      
                 data: apiBusinessRouteTagBatchUpdateSort_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/routeTag/edit
  * summary: 修改路线标签
 * tags: 路线标签
 */
let apiBusinessRouteTagEdit_Body = {
      iconId: null,   /** 图标   integer required: */
      tabTemplate: null,   /** 标签模板   string required: */
      cardId: null,   /** 乡村名片ID   integer required: */
      name: null,   /** 标签名称   string required: */
      sort: null,   /** 排序   integer required: */
      exhibit: null,   /** 展示数量   integer required: */
      routeTagId: null,   /** 标签ID   integer required: */
      isShow: null,   /** 是否展示(0:正常,1:停用)   integer required: */
    }
    
export function apiBusinessRouteTagEdit_Post(   apiBusinessRouteTagEdit_Body) {
    return request({
         url:`/api/business/routeTag/edit`,
         method:'post',
                      
                 data: apiBusinessRouteTagEdit_Body
    })
}
/**  =========================================================================== ***/
