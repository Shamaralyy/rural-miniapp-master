
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/business/informationTag/batchUpdateSort
  * summary: 批量修改排序(传承list集合)
 * tags: 资讯标签
 */
let apiBusinessInformationTagBatchUpdateSort_Body = {
      infoTagId: null,   /** id   number required: */
      sort: null,   /** 排序   number required: */
    }
    
export function apiBusinessInformationTagBatchUpdateSort_Post(   apiBusinessInformationTagBatchUpdateSort_Body) {
    return request({
         url:`/api/business/informationTag/batchUpdateSort`,
         method:'post',
                      
                 data: apiBusinessInformationTagBatchUpdateSort_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/informationTag/add
  * summary: 新增资讯标签
 * tags: 资讯标签
 */
let apiBusinessInformationTagAdd_Body = {
      tabTemplate: null,   /** 标签模板   string required: */
      cardId: null,   /** 乡村名片ID   number required: */
      icon: null,   /** 图标   string required: */
      name: null,   /** 标签名称   string required: */
      sort: null,   /** 排序   number required: */
      exhibit: null,   /** 展示数量   number required: */
      isShow: null,   /** 是否展示(0:正常,1:停用)   number required: */
    }
    
export function apiBusinessInformationTagAdd_Post(   apiBusinessInformationTagAdd_Body) {
    return request({
         url:`/api/business/informationTag/add`,
         method:'post',
                      
                 data: apiBusinessInformationTagAdd_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/informationTag/tagLabel
  * summary: 分类下拉数据
 * tags: 资讯标签
 */
let apiBusinessInformationTagTagLabel_Param = {
     cardId: null,   /** 名片ID    string required:false */
   }
    
export function apiBusinessInformationTagTagLabel_Get( apiBusinessInformationTagTagLabel_Param    ) {
    return request({
         url:`/api/business/informationTag/tagLabel`,
         method:'get',
                     params:apiBusinessInformationTagTagLabel_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/informationTag/list
  * summary: 分页查询资讯标签列表
 * tags: 资讯标签
 */
let apiBusinessInformationTagList_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     cardId: null,   /** 名片ID    string required:false */
     name: null,   /** 名称    string required:false */
     status: null,   /** 状态(0:未审核,1:已通过,2:未通过)    string required:false */
   }
    
export function apiBusinessInformationTagList_Post( apiBusinessInformationTagList_Param    ) {
    return request({
         url:`/api/business/informationTag/list`,
         method:'post',
                     params:apiBusinessInformationTagList_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/informationTag/info/${apiBusinessInformationTagInfoinfoTagId_Param["infoTagId"]}
  * summary: 获取资讯标签详细信息
 * tags: 资讯标签
 */
let apiBusinessInformationTagInfoinfoTagId_Param = {
     infoTagId: null,   /** 标签ID    string required:true */
   }
    
export function apiBusinessInformationTagInfoinfoTagId_Get( apiBusinessInformationTagInfoinfoTagId_Param    ) {
    return request({
         url:`/api/business/informationTag/info/${apiBusinessInformationTagInfoinfoTagId_Param["infoTagId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/informationTag/edit
  * summary: 修改资讯标签
 * tags: 资讯标签
 */
let apiBusinessInformationTagEdit_Body = {
      iconId: null,   /** 图标   integer required: */
      infoTagId: null,   /** 标签ID   integer required: */
      tabTemplate: null,   /** 标签模板   string required: */
      cardId: null,   /** 乡村名片ID   integer required: */
      name: null,   /** 标签名称   string required: */
      sort: null,   /** 排序   integer required: */
      exhibit: null,   /** 展示数量   integer required: */
      isShow: null,   /** 是否展示(0:正常,1:停用)   integer required: */
    }
    
export function apiBusinessInformationTagEdit_Post(   apiBusinessInformationTagEdit_Body) {
    return request({
         url:`/api/business/informationTag/edit`,
         method:'post',
                      
                 data: apiBusinessInformationTagEdit_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/informationTag/remove/${apiBusinessInformationTagRemoveinfoTagIds_Param["infoTagIds"]}
  * summary: 删除资讯标签
 * tags: 资讯标签
 */
let apiBusinessInformationTagRemoveinfoTagIds_Param = {
     infoTagIds: null,   /**     string required:true */
   }
    
export function apiBusinessInformationTagRemoveinfoTagIds_Delete( apiBusinessInformationTagRemoveinfoTagIds_Param    ) {
    return request({
         url:`/api/business/informationTag/remove/${apiBusinessInformationTagRemoveinfoTagIds_Param["infoTagIds"]}`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/
