
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/business/atlasTag/info/${apiBusinessAtlasTagInfoinfoTagId_Param["infoTagId"]}
  * summary: 获取图集标签详细信息
 * tags: 图集标签
 */
let apiBusinessAtlasTagInfoinfoTagId_Param = {
     infoTagId: null,   /** 标签ID    string required:true */
   }
    
export function apiBusinessAtlasTagInfoinfoTagId_Get( apiBusinessAtlasTagInfoinfoTagId_Param    ) {
    return request({
         url:`/api/business/atlasTag/info/${apiBusinessAtlasTagInfoinfoTagId_Param["infoTagId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/atlasTag/list
  * summary: 分页查询图集标签列表
 * tags: 图集标签
 */
let apiBusinessAtlasTagList_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     cardId: null,   /** 名片ID    string required:false */
     name: null,   /** 名称    string required:false */
     status: null,   /** 状态(0:未审核,1:已通过,2:未通过)    string required:false */
   }
    
export function apiBusinessAtlasTagList_Post( apiBusinessAtlasTagList_Param    ) {
    return request({
         url:`/api/business/atlasTag/list`,
         method:'post',
                     params:apiBusinessAtlasTagList_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/atlasTag/tagLabel
  * summary: 分类下拉数据
 * tags: 图集标签
 */
let apiBusinessAtlasTagTagLabel_Param = {
     cardId: null,   /** 名片ID    string required:false */
   }
    
export function apiBusinessAtlasTagTagLabel_Get( apiBusinessAtlasTagTagLabel_Param    ) {
    return request({
         url:`/api/business/atlasTag/tagLabel`,
         method:'get',
                     params:apiBusinessAtlasTagTagLabel_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/atlasTag/add
  * summary: 新增图集标签
 * tags: 图集标签
 */
let apiBusinessAtlasTagAdd_Body = {
      tabTemplate: null,   /** 标签模板   string required: */
      cardId: null,   /** 乡村名片ID   number required: */
      icon: null,   /** 图标   string required: */
      name: null,   /** 标签名称   string required: */
      sort: null,   /** 排序   number required: */
      exhibit: null,   /** 展示数量   number required: */
      isShow: null,   /** 是否展示(0:正常,1:停用)   number required: */
    }
    
export function apiBusinessAtlasTagAdd_Post(   apiBusinessAtlasTagAdd_Body) {
    return request({
         url:`/api/business/atlasTag/add`,
         method:'post',
                      
                 data: apiBusinessAtlasTagAdd_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/atlasTag/batchUpdateSort
  * summary: 批量修改排序(传list集合)
 * tags: 图集标签
 */
let apiBusinessAtlasTagBatchUpdateSort_Body = {
      infoTagId: null,   /** id   number required: */
      sort: null,   /** 排序   number required: */
    }
    
export function apiBusinessAtlasTagBatchUpdateSort_Post(   apiBusinessAtlasTagBatchUpdateSort_Body) {
    return request({
         url:`/api/business/atlasTag/batchUpdateSort`,
         method:'post',
                      
                 data: apiBusinessAtlasTagBatchUpdateSort_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/atlasTag/remove/${apiBusinessAtlasTagRemoveinfoTagIds_Param["infoTagIds"]}
  * summary: 删除图集标签
 * tags: 图集标签
 */
let apiBusinessAtlasTagRemoveinfoTagIds_Param = {
     infoTagIds: null,   /**     string required:true */
   }
    
export function apiBusinessAtlasTagRemoveinfoTagIds_Delete( apiBusinessAtlasTagRemoveinfoTagIds_Param    ) {
    return request({
         url:`/api/business/atlasTag/remove/${apiBusinessAtlasTagRemoveinfoTagIds_Param["infoTagIds"]}`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/atlasTag/edit
  * summary: 修改图集标签
 * tags: 图集标签
 */
let apiBusinessAtlasTagEdit_Body = {
      iconId: null,   /** 图标   integer required: */
      infoTagId: null,   /** 标签ID   integer required: */
      tabTemplate: null,   /** 标签模板   string required: */
      cardId: null,   /** 乡村名片ID   integer required: */
      name: null,   /** 标签名称   string required: */
      sort: null,   /** 排序   integer required: */
      exhibit: null,   /** 展示数量   integer required: */
      isShow: null,   /** 是否展示(0:正常,1:停用)   integer required: */
    }
    
export function apiBusinessAtlasTagEdit_Post(   apiBusinessAtlasTagEdit_Body) {
    return request({
         url:`/api/business/atlasTag/edit`,
         method:'post',
                      
                 data: apiBusinessAtlasTagEdit_Body
    })
}
/**  =========================================================================== ***/
