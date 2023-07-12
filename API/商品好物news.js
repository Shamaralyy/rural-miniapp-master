
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/business/commodity/edit
  * summary: 修改商品好物
 * tags: 商品好物news
 */
let apiBusinessCommodityEdit_Body = {
      unitPrice: null,   /** 单价   string required: */
      quantity: null,   /** 数量   string required: */
      tagId: null,   /** 好物标签ID(数组结构)   integer required: */
      coordinateId: null,   /** 坐标ID   integer required: */
      latitude: null,   /** 纬度   string required: */
      commodityId: null,   /** 好物ID   integer required: */
      synopsis: null,   /** 简介   string required: */
      title: null,   /** 标题   string required: */
      content: null,   /** 内容(富文本)   string required: */
      url: null,   /** 自定义URL   string required: */
      urls: null,   /** 图集   string required: */
      pageviews: null,   /** 浏览量   integer required: */
      videoUrl: null,   /** 视频   string required: */
      cardId: null,   /** 乡村名片ID   integer required: */
      longitude: null,   /** 经度   string required: */
    }
    
export function apiBusinessCommodityEdit_Post(   apiBusinessCommodityEdit_Body) {
    return request({
         url:`/api/business/commodity/edit`,
         method:'post',
                      
                 data: apiBusinessCommodityEdit_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/commodity/info/${apiBusinessCommodityInfocommodityId_Param["commodityId"]}
  * summary: 获取商品好物详细信息
 * tags: 商品好物news
 */
let apiBusinessCommodityInfocommodityId_Param = {
     commodityId: null,   /**     string required:true */
   }
    
export function apiBusinessCommodityInfocommodityId_Get( apiBusinessCommodityInfocommodityId_Param    ) {
    return request({
         url:`/api/business/commodity/info/${apiBusinessCommodityInfocommodityId_Param["commodityId"]}`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/commodity/page
  * summary: 分页查询商品好物列表
 * tags: 商品好物news
 */
let apiBusinessCommodityPage_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
     cardId: null,   /** 名片ID    string required:false */
     tagId: null,   /** 标签ID    string required:false */
     coordinateId: null,   /** 坐标ID    string required:false */
     status: null,   /** 状态(0:未审核,1:已通过,2:未通过)    string required:false */
   }
    
export function apiBusinessCommodityPage_Post( apiBusinessCommodityPage_Param    ) {
    return request({
         url:`/api/business/commodity/page`,
         method:'post',
                     params:apiBusinessCommodityPage_Param  
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/commodity/add
  * summary: 新增商品好物
 * tags: 商品好物news
 */
let apiBusinessCommodityAdd_Body = {
      unitPrice: null,   /** 单价   string required: */
      quantity: null,   /** 数量   string required: */
      tagId: null,   /** 好物标签ID(数组)   integer required: */
      coordinateId: null,   /** 坐标ID   integer required: */
      latitude: null,   /** 纬度   string required: */
      synopsis: null,   /** 简介   string required: */
      title: null,   /** 标题   string required: */
      content: null,   /** 内容(富文本)   string required: */
      url: null,   /** 自定义URL   string required: */
      urls: null,   /** 图集   string required: */
      pageviews: null,   /** 浏览量   integer required: */
      videoUrl: null,   /** 视频   string required: */
      cardId: null,   /** 乡村名片ID   integer required: */
      longitude: null,   /** 经度   string required: */
    }
    
export function apiBusinessCommodityAdd_Post(   apiBusinessCommodityAdd_Body) {
    return request({
         url:`/api/business/commodity/add`,
         method:'post',
                      
                 data: apiBusinessCommodityAdd_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/commodity/remove/${apiBusinessCommodityRemovecommodityIds_Param["commodityIds"]}
  * summary: 删除商品好物
 * tags: 商品好物news
 */
let apiBusinessCommodityRemovecommodityIds_Param = {
     commodityIds: null,   /**     string required:true */
   }
    
export function apiBusinessCommodityRemovecommodityIds_Delete( apiBusinessCommodityRemovecommodityIds_Param    ) {
    return request({
         url:`/api/business/commodity/remove/${apiBusinessCommodityRemovecommodityIds_Param["commodityIds"]}`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/
