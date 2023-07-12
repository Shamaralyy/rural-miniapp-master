
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/business/commodityTag/info/${apiBusinessCommodityTagInfoinfoTagId_Param["infoTagId"]}
  * summary: 获取好物标签详细信息
 * tags: 好物标签
 */
let apiBusinessCommodityTagInfoinfoTagId_Param = {
     infoTagId: null,   /** 标签ID    string required:true */
   }
    
export function apiBusinessCommodityTagInfoinfoTagId_Get( apiBusinessCommodityTagInfoinfoTagId_Param    ) {
    return request({
         url:`/api/business/commodityTag/info/${apiBusinessCommodityTagInfoinfoTagId_Param["infoTagId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/commodityTag/batchUpdateSort
  * summary: 批量修改排序(传list集合)
 * tags: 好物标签
 */
let apiBusinessCommodityTagBatchUpdateSort_Body = {
      infoTagId: null,   /** id   number required: */
      sort: null,   /** 排序   number required: */
    }
    
export function apiBusinessCommodityTagBatchUpdateSort_Post(   apiBusinessCommodityTagBatchUpdateSort_Body) {
    return request({
         url:`/api/business/commodityTag/batchUpdateSort`,
         method:'post',
                      
                 data: apiBusinessCommodityTagBatchUpdateSort_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/commodityTag/list
  * summary: 分页查询好物标签列表
 * tags: 好物标签
 */
let apiBusinessCommodityTagList_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     cardId: null,   /** 名片ID    string required:false */
     name: null,   /** 名称    string required:false */
     status: null,   /** 状态(0:未审核,1:已通过,2:未通过)    string required:false */
   }
    
export function apiBusinessCommodityTagList_Post( apiBusinessCommodityTagList_Param    ) {
    return request({
         url:`/api/business/commodityTag/list`,
         method:'post',
                     params:apiBusinessCommodityTagList_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/commodityTag/remove/${apiBusinessCommodityTagRemoveinfoTagIds_Param["infoTagIds"]}
  * summary: 删除好物标签
 * tags: 好物标签
 */
let apiBusinessCommodityTagRemoveinfoTagIds_Param = {
     infoTagIds: null,   /**     string required:true */
   }
    
export function apiBusinessCommodityTagRemoveinfoTagIds_Delete( apiBusinessCommodityTagRemoveinfoTagIds_Param    ) {
    return request({
         url:`/api/business/commodityTag/remove/${apiBusinessCommodityTagRemoveinfoTagIds_Param["infoTagIds"]}`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/commodityTag/edit
  * summary: 修改好物标签
 * tags: 好物标签
 */
let apiBusinessCommodityTagEdit_Body = {
      iconId: null,   /** 图标   integer required: */
      infoTagId: null,   /** 标签ID   integer required: */
      tabTemplate: null,   /** 标签模板   string required: */
      cardId: null,   /** 乡村名片ID   integer required: */
      name: null,   /** 标签名称   string required: */
      sort: null,   /** 排序   integer required: */
      exhibit: null,   /** 展示数量   integer required: */
      isShow: null,   /** 是否展示(0:正常,1:停用)   integer required: */
    }
    
export function apiBusinessCommodityTagEdit_Post(   apiBusinessCommodityTagEdit_Body) {
    return request({
         url:`/api/business/commodityTag/edit`,
         method:'post',
                      
                 data: apiBusinessCommodityTagEdit_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/commodityTag/tagLabel
  * summary: 好物分类下拉数据
 * tags: 好物标签
 */
let apiBusinessCommodityTagTagLabel_Param = {
     cardId: null,   /** 名片ID    string required:false */
   }
    
export function apiBusinessCommodityTagTagLabel_Get( apiBusinessCommodityTagTagLabel_Param    ) {
    return request({
         url:`/api/business/commodityTag/tagLabel`,
         method:'get',
                     params:apiBusinessCommodityTagTagLabel_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/commodityTag/add
  * summary: 新增好物标签
 * tags: 好物标签
 */
let apiBusinessCommodityTagAdd_Body = {
      tabTemplate: null,   /** 标签模板   string required: */
      cardId: null,   /** 乡村名片ID   number required: */
      icon: null,   /** 图标   string required: */
      name: null,   /** 标签名称   string required: */
      sort: null,   /** 排序   number required: */
      exhibit: null,   /** 展示数量   number required: */
      isShow: null,   /** 是否展示(0:正常,1:停用)   number required: */
    }
    
export function apiBusinessCommodityTagAdd_Post(   apiBusinessCommodityTagAdd_Body) {
    return request({
         url:`/api/business/commodityTag/add`,
         method:'post',
                      
                 data: apiBusinessCommodityTagAdd_Body
    })
}
/**  =========================================================================== ***/
