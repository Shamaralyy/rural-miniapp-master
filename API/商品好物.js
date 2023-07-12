
/*** glowxq glowxq@163.com  2022-08-21 18:25:51  生成模板  */
import { request } from "@/utils/request"



/***  ===========================================================================
 * path: /api/business/commodity/edit12
  * summary: 修改商品-好物
 * tags: 商品-好物
 */
let apiBusinessCommodityEdit12_Body = {
      unitPrice: null,   /** 单价   number required: */
      images: null,   /** 发布图片json   string required: */
      quantity: null,   /** 数量   integer required: */
      coordinateId: null,   /** 坐标id   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      commodityId: null,   /** $column.columnComment   integer required: */
      userId: null,   /** 发布用户id   integer required: */
      choiceness: null,   /** 是否推荐(0:是1:否)   integer required: */
      createBy: null,   /** $property.description   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      cardId: null,   /** 名片id   integer required: */
      name: null,   /** 商品名   string required: */
      status: null,   /** 状态=0未审核,1审核通过,2拒绝   integer required: */
    }
    
export function apiBusinessCommodityEdit12_Put(   apiBusinessCommodityEdit12_Body) {
    return request({
         url:`/api/business/commodity/edit12`,
         method:'put',
                      
                 data: apiBusinessCommodityEdit12_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/commodity/add12
  * summary: 新增商品-好物
 * tags: 商品-好物
 */
let apiBusinessCommodityAdd12_Body = {
      unitPrice: null,   /** 单价   number required: */
      images: null,   /** 发布图片json   string required: */
      quantity: null,   /** 数量   integer required: */
      cardId: null,   /** 名片id   integer required: */
      coordinateId: null,   /** 坐标id   integer required: */
      name: null,   /** 商品名   string required: */
      choiceness: null,   /** 是否推荐(0:是1:否)   integer required: */
    }
    
export function apiBusinessCommodityAdd12_Post(   apiBusinessCommodityAdd12_Body) {
    return request({
         url:`/api/business/commodity/add12`,
         method:'post',
                      
                 data: apiBusinessCommodityAdd12_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/commodity/list
  * summary: 分页查询商品-好物列表
 * tags: 商品-好物
 */
let apiBusinessCommodityList_Param = {
     pageNum: null,   /**     string required:false */
     pageSize: null,   /**     string required:false */
   }
let apiBusinessCommodityList_Body = {
      unitPrice: null,   /** 单价   number required: */
      images: null,   /** 发布图片json   string required: */
      quantity: null,   /** 数量   integer required: */
      coordinateId: null,   /** 坐标id   integer required: */
      updateTime: null,   /** $property.description   integer required: */
      remark: null,   /** $property.description   string required: */
      commodityId: null,   /** $column.columnComment   integer required: */
      userId: null,   /** 发布用户id   integer required: */
      choiceness: null,   /** 是否推荐(0:是1:否)   integer required: */
      createBy: null,   /** $property.description   string required: */
      createTime: null,   /** $property.description   integer required: */
      updateBy: null,   /** $property.description   string required: */
      cardId: null,   /** 名片id   integer required: */
      name: null,   /** 商品名   string required: */
      status: null,   /** 状态=0未审核,1审核通过,2拒绝   integer required: */
    }
        
export function apiBusinessCommodityList_Post( apiBusinessCommodityList_Param  , apiBusinessCommodityList_Body) {
    return request({
         url:`/api/business/commodity/list`,
         method:'post',
                     params:apiBusinessCommodityList_Param ,
                 data: apiBusinessCommodityList_Body
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/commodity/info/${apiBusinessCommodityInfocommodityId12_Param["commodityId"]}12
  * summary: 获取商品-好物详细信息
 * tags: 商品-好物
 */
let apiBusinessCommodityInfocommodityId12_Param = {
     commodityId: null,   /**     string required:true */
   }
    
export function apiBusinessCommodityInfocommodityId12_Get( apiBusinessCommodityInfocommodityId12_Param    ) {
    return request({
         url:`/api/business/commodity/info/${apiBusinessCommodityInfocommodityId12_Param["commodityId"]}12`,
         method:'get',
                
    })
}
/**  =========================================================================== ***/

/***  ===========================================================================
 * path: /api/business/commodity/remove/${apiBusinessCommodityRemovecommodityIds12_Param["commodityIds"]}12
  * summary: 删除商品-好物
 * tags: 商品-好物
 */
let apiBusinessCommodityRemovecommodityIds12_Param = {
     commodityIds: null,   /**     string required:true */
   }
    
export function apiBusinessCommodityRemovecommodityIds12_Delete( apiBusinessCommodityRemovecommodityIds12_Param    ) {
    return request({
         url:`/api/business/commodity/remove/${apiBusinessCommodityRemovecommodityIds12_Param["commodityIds"]}12`,
         method:'delete',
                
    })
}
/**  =========================================================================== ***/
